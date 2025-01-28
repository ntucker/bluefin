import { Link } from '@anansi/router';
import { useController } from '@data-client/react';
import { memo } from 'react';

import { type Currency } from '@/resources/Currency';
import { HoldingResource } from '@/resources/Holding';

import { Price, Gain24 } from './AssetPrice';
import * as styles from './CurrencyList.module.scss';
import { formatLargePrice } from '../formatters';

function CurrencyListItem({ currency }: { currency: Currency }) {
  const ctrl = useController();
  return (
    <tr>
      <td>
        {currency.icon && (
          <img src={currency.icon} width="20" height="20" alt={currency.name} />
        )}
      </td>
      <td align="left" className={styles.name}>
        <Link name="AssetDetail" props={{ id: currency.id }}>
          {currency.name}
          <br />
          <small>{currency.display_name}</small>
        </Link>
      </td>
      <td align="right">
        {formatLargePrice.format(currency?.stats?.volume_usd)}
      </td>
      <td align="right" width="100">
        <Price product_id={`${currency.id}-USD`} />
      </td>
      <td align="right" width="100">
        <Gain24 product_id={`${currency.id}-USD`} />
      </td>
      <td>
        <button onClick={() => ctrl.fetch(HoldingResource.buy, currency.id, 1)}>
          Buy
        </button>
        <button
          onClick={() => ctrl.fetch(HoldingResource.buy, currency.id, -1)}
        >
          Sell
        </button>
      </td>
      <td>{currency.holding?.amount}</td>
    </tr>
  );
}
export default memo(CurrencyListItem);
