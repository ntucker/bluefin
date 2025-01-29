import { Link } from '@anansi/router';
import {
  useFetch,
  useQuery,
  useSubscription,
  useSuspense,
} from '@data-client/react';
import { Empty } from 'antd';
import { memo } from 'react';

import { CurrencyResource } from '@/resources/Currency';
import { Holding, HoldingResource } from '@/resources/Holding';
import { getTicker } from '@/resources/Ticker';

import { formatLargePrice } from '../formatters';
import * as styles from './HoldingList.module.css';
import { Gain24 } from '../CurrencyList/AssetPrice';

function HoldingsList() {
  useFetch(CurrencyResource.getList);
  useSuspense(HoldingResource.getList);
  const holdings = useQuery(HoldingResource.queryHoldings);

  if (!holdings?.length) {
    return (
      <div className={styles.container}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No holdings" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {holdings.map(holding => (
        <MemoizedHoldingListItem key={holding.id} holding={holding} />
      ))}
    </div>
  );
}

function HoldingListItem({ holding }: { holding: Holding }) {
  const product_id = `${holding.id}-USD`;
  useSubscription(getTicker, { product_id });
  return (
    <Link
      component="div"
      name="Currency"
      className={styles.stockItem}
      props={{ id: holding.id }}
    >
      <div>
        <div className={styles.symbol}>{holding.currency?.name}</div>
        <div className={styles.shares}>{holding.amount} Coins</div>
      </div>
      <div>
        <div className={styles.price}>
          {formatLargePrice.format(holding.value)}
        </div>
        <Gain24 product_id={product_id} />
      </div>
    </Link>
  );
}

const MemoizedHoldingListItem = memo(HoldingListItem);

export default memo(HoldingsList);
