import { Schema } from '@data-client/react';
import {
  Endpoint,
  schema,
  Entity,
  SnapshotInterface,
  Queryable,
} from '@data-client/rest';
import { openDB, type IDBPDatabase } from 'idb';

export let idb: Promise<IDBPDatabase | undefined>;
const { Collection, Invalidate } = schema;

if (typeof window !== 'undefined') {
  idb = openDB('data-client', 1, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      database.createObjectStore('Holding', { keyPath: 'id' });
    },
  });
} else {
  idb = Promise.resolve(undefined);
}
console.log('idb', idb);
idb.then(db => {
  console.log('done', db);
});

export function localResource<
  S extends typeof Entity,
  SL extends Schema = schema.Collection<[S]>,
>(
  schema: S,
  {
    getListSchema = new Collection([schema]) as any as SL,
  }: { getListSchema?: SL } = {},
) {
  return {
    get: new Endpoint(async (id: string) => (await idb)?.get(schema.key, id), {
      schema,
      name: `${schema.key}.get`,
    }),
    getList: new Endpoint(async () => (await idb)?.getAll(schema.key) ?? [], {
      schema: getListSchema,
      name: `${schema.key}.getList`,
    }),
    update: new Endpoint(
      async (value: Record<string, unknown>) =>
        (await idb)?.put(schema.key, value),
      {
        schema,
        getOptimisticResponse: optimisticUpdate(schema),
        sideEffect: true,
        name: `${schema.key}.update`,
      },
    ),
    create: new Endpoint(
      async (value: Record<string, unknown>) => {
        (await idb)?.add(schema.key, value);
        return value;
      },
      {
        schema: new Collection([schema]).push,
        getOptimisticResponse: optimisticDelete,
        sideEffect: true,
        name: `${schema.key}.create`,
      },
    ),
    delete: new Endpoint(
      async (id: string) => (await idb)?.delete(schema.key, id),
      {
        schema: new Invalidate(schema),
        getOptimisticResponse: optimisticDelete,
        sideEffect: true,
        name: `${schema.key}.delete`,
      },
    ),
  };
}

function optimisticUpdate(schema: Queryable) {
  return function (snap: SnapshotInterface, value: any) {
    const data = snap.get(schema, value);
    if (!data) throw snap.abort;
    return {
      ...data,
      ...ensurePojo(value),
    };
  };
}
function optimisticDelete(snap: SnapshotInterface, value: any) {
  return value;
}
function ensurePojo(body: any) {
  return body instanceof FormData
    ? Object.fromEntries((body as any).entries())
    : body;
}
