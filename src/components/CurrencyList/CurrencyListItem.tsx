import { Link } from '@anansi/router';
import { memo } from 'react';

import { type Currency } from '@/resources/Currency';

import { Price, Gain24 } from './AssetPrice';
import * as styles from './CurrencyList.module.scss';
import { formatLargePrice } from '../formatters';
import TradeButtons from '../TradeButtons';

function CurrencyListItem({ currency }: { currency: Currency }) {
  return (
    <tr>
      <td>
        {currency.icon && (
          <img src={currency.icon} width="20" height="20" alt={currency.name} />
        )}
      </td>
      <td align="left" className={styles.name}>
        <Link name="Currency" props={{ id: currency.id }}>
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
        <TradeButtons currency={currency} small />
      </td>
      <td>{currency.holding?.amount}</td>
    </tr>
  );
}
export default memo(CurrencyListItem);
