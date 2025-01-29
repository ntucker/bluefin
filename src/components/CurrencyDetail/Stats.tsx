import { useQuery, useSuspense } from '@data-client/react';
import type { DescriptionsProps } from 'antd';
import Descriptions from 'antd/es/descriptions';

import { formatPrice, formatLargePrice } from '@/components/formatters';
import { Holding, HoldingResource } from '@/resources/Holding';
import { StatsResource } from '@/resources/Stats';

import { Gain24 } from '../CurrencyList/AssetPrice';

export function Stats({ id }: { id: string }) {
  const stats = useSuspense(StatsResource.get, { product_id: id });
  const holding = useQuery(Holding, { id: id.split('-')[0] });

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'high',
      children: formatPrice.format(stats.high),
    },
    {
      key: '2',
      label: 'low',
      children: formatPrice.format(stats.low),
    },
    {
      key: '3',
      label: 'volume',
      children: formatLargePrice.format(stats.volume_usd),
    },
    {
      key: '4',
      label: '24h %',
      children: <Gain24 product_id={id} />,
    },
  ];

  if (holding?.amount) {
    items.push(
      {
        key: '5',
        label: 'holding',
        children: holding.amount,
      },
      {
        key: '6',
        label: 'value',
        children: formatLargePrice.format(holding.value),
      },
    );
  }

  return <Descriptions title="Stats" bordered column={2} items={items} />;
}
