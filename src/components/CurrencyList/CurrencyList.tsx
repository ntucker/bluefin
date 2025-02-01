import { Link } from '@anansi/router';
import { useQuery } from '@data-client/react';
import { type TableProps } from 'antd';
import Table from 'antd/es/table';
import { memo } from 'react';

import { Currency } from '@/resources/Currency';
import { Holding } from '@/resources/Holding';

import { formatLargePrice } from '../formatters';
import TradeButtons from '../TradeButtons';
import { Price, Gain24 } from './AssetPrice';
import * as styles from './CurrencyList.module.scss';

function CurrencyList({ currencies }: { currencies: Currency[] }) {
  return (
    <Table<Currency>
      className={styles.table}
      columns={columns}
      dataSource={currencies}
      rowKey="id"
      size="small"
      pagination={false}
      // virtual
      // scroll={{ x: 100, y: 600 }}
    />
  );
}
export default memo(CurrencyList);

const columns: TableProps<Currency>['columns'] = [
  {
    title: '',
    key: 'icon',
    width: 10,
    align: 'right',
    render: (currency: Currency) =>
      currency.icon && (
        <img src={currency.icon} width="20" height="20" alt={currency.name} />
      ),
  },
  {
    title: 'Name',
    key: 'name',
    render: currency => (
      <Link name="Currency" props={{ id: currency.id }} className={styles.name}>
        <div>{currency.name}</div>
        <div>
          <small>{currency.display_name}</small>
        </div>
      </Link>
    ),
  },
  {
    title: 'Volume (30d)',
    key: 'volume',
    render: currency => formatLargePrice.format(currency?.stats?.volume_usd),
  },
  {
    title: 'Price',
    key: 'price',
    align: 'right',
    dataIndex: 'id',
    render: id => <Price product_id={`${id}-USD`} />,
  },
  {
    title: '24h %',
    key: 'gain',
    align: 'right',
    dataIndex: 'id',
    render: id => <Gain24 product_id={`${id}-USD`} />,
  },
  {
    title: 'Holdings',
    key: 'holding',
    dataIndex: 'id',
    render: id => <HoldingCell id={id} />,
  },
];

function HoldingCell({ id }: { id: string }) {
  const holding = useQuery(Holding, { id });
  return (
    <>
      {holding?.amount && holding?.amount > 0 ? holding?.amount : ''}{' '}
      <TradeButtons id={id} small />
    </>
  );
}
