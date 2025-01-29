import { useQuery } from '@data-client/react';

import { HoldingResource } from '@/resources/Holding';

import { formatLargePrice } from '../formatters';

export default function HoldingsTotal() {
  const total = useQuery(HoldingResource.total) ?? 0;
  return <span>Total Value: {formatLargePrice.format(total)}</span>;
}
