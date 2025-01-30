import { AsyncBoundary, useSuspense } from '@data-client/react';
import { memo } from 'react';

import TradeButtons from '@/components/TradeButtons';
import { Currency, CurrencyResource } from '@/resources/Currency';

import { AssetChart } from './AssetChart';
import { Price } from './AssetPrice';
import * as styles from './CurrencyDetail.module.css';
import { Stats } from './Stats';

function CurrencyDetail({ width, height, currency }: Props) {
  const product_id = `${currency.id}-USD`;

  return (
    <>
      <title>{`${currency.name} Prices with Reactive Data Client`}</title>
      <header>
        <TradeButtons id={currency.id} />
        <h1>
          <img
            src={currency.icon}
            style={{ marginBottom: '-.1em' }}
            width="32"
            height="32"
            alt={currency.name}
          />{' '}
          {currency.name} <small>{currency.display_name}</small>
        </h1>
        <h2>
          <Price product_id={product_id} />
        </h2>
      </header>
      <AsyncBoundary fallback={<div style={{ width, height }}>&nbsp;</div>}>
        <AssetChart product_id={product_id} width={width} height={height} />
      </AsyncBoundary>
      <section className={styles.statSection}>
        <Stats id={product_id} />
      </section>
    </>
  );
}
interface Props {
  width: number;
  height: number;
  currency: Currency;
}
export default memo(CurrencyDetail);
