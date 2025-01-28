import { schema, Endpoint, Entity } from '@data-client/rest';

// import { Currency } from './Currency';
import { idb, localResource } from './localResource';

/*#__PURE__*/
export class Holding extends Entity {
  id = '';
  // currency? = Currency.fromJS();
  amount = 0;

  // static schema = {
  //   currency: Currency,
  // };
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
};
