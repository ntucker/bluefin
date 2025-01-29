import { lazy, Route } from '@anansi/router';
import { getImage } from '@data-client/img';
import { Controller } from '@data-client/react';

import { getCandles } from '@/resources/Candles';
import { CurrencyResource } from '@/resources/Currency';
import { HoldingResource } from '@/resources/Holding';
import { StatsResource } from '@/resources/Stats';
import { getTicker } from '@/resources/Ticker';

const lazyPage = (pageName: string) =>
  lazy(
    () =>
      import(
        /* webpackChunkName: '[request]', webpackPrefetch: true */ `pages/${pageName}`
      ),
  );

export const namedPaths = {
  Home: '/',
  Currency: '/currency/:id',
} as const;

export const routes: Route<Controller>[] = [
  {
    name: 'Home',
    component: lazyPage('Home'),
    async resolveData(controller) {
      await Promise.allSettled([
        await controller.fetchIfStale(StatsResource.getList),
        await controller.fetchIfStale(HoldingResource.getList),
        await controller.fetchIfStale(CurrencyResource.getList),
      ]);
    },
  },
  {
    name: 'Currency',
    component: lazyPage('CurrencyPage'),
    async resolveData(controller, { id }: { id: string }) {
      const product_id = `${id}-USD`;
      await Promise.allSettled([
        controller.fetchIfStale(StatsResource.get, { product_id }),
        controller.fetchIfStale(getTicker, { product_id }),
        controller.fetchIfStale(getCandles, { product_id }),
      ]);
    },
  },
];
