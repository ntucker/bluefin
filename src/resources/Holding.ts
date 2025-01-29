import {
  schema,
  Endpoint,
  Entity,
  AbstractInstanceType,
  Schema,
} from '@data-client/rest';

import { Currency } from './Currency';
import { idb, localResource } from './localResource';
import { Ticker } from './Ticker';

/*#__PURE__*/
export class Holding extends Entity {
  id = '';
  currency?: Currency;
  ticker?: Ticker;
  amount = 0;

  get value() {
    return this.amount * (this.ticker?.price || 0);
  }

  static schema: Record<string, Schema> = {
    ticker: Ticker,
    currency: Currency,
  };

  static fromJS<T extends typeof Entity>(
    this: T,
    props?: any,
  ): AbstractInstanceType<T> {
    const product_id = `${props?.id}-USD`;
    // client-side currency and ticker joins
    return super.fromJS({
      ...props,
      currency: props?.id,
      ticker: product_id,
    }) as any;
  }
}

export const HoldingResource = {
  ...localResource(Holding),
  buy: new Endpoint(
    async (id: string, amount: number) => {
      const existing = await (await idb)?.get(Holding.key, id);
      if (!existing) {
        const value = { id, amount };
        (await idb)?.add(Holding.key, value);
        return value;
      }
      const value = {
        ...existing,
        amount: Math.max(existing.amount + amount, 0),
      };
      (await idb)?.put(Holding.key, value);
      return value;
    },
    {
      schema: Holding,
      getOptimisticResponse(snap, id, amount) {
        const existing = snap.get(Holding, { id });
        if (!existing) return { id, amount, currency: id };
        return {
          ...existing,
          amount: Math.max(existing.amount + amount, 0),
        };
      },
      sideEffect: true,
      name: `${Holding.key}.buy`,
    },
  ),
  total: new schema.Query(new schema.All(Holding), holdings => {
    return holdings.reduce((acc, a) => acc + a.value, 0);
  }),
  queryHoldings: new schema.Query(new schema.All(Holding), holdings => {
    return [...holdings.filter(a => a.amount > 0)].sort(
      (a, b) => b.value - a.value,
    );
  }),
};
