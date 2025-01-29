import { useSuspense } from '@data-client/react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

import { formatPrice, formatLargePrice } from '@/components/formatters';
import { StatsResource } from '@/resources/Stats';

import { Gain24 } from '../CurrencyList/AssetPrice';

export function Stats({ id }: { id: string }) {
  const stats = useSuspense(StatsResource.get, { product_id: id });

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

  return <Descriptions title="Stats" bordered column={2} items={items} />;
}
