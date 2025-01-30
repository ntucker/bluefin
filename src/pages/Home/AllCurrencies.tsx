import { useFetch, useQuery, useSuspense } from '@data-client/react';

import CurrencyList from '@/components/CurrencyList/CurrencyList';
import { CurrencyResource, queryCurrency } from '@/resources/Currency';
import { HoldingResource } from '@/resources/Holding';
import { StatsResource } from '@/resources/Stats';

export default function AllCurrencies() {
  useFetch(StatsResource.getList);
  useFetch(HoldingResource.getList);
  useSuspense(CurrencyResource.getList);
  useSuspense(StatsResource.getList);
  const currencies = useQuery(queryCurrency);
  if (!currencies) return null;
  return <CurrencyList currencies={currencies} />;
}
