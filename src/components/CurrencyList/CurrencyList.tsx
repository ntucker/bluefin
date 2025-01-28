import { type Currency } from '@/resources/Currency';

import * as styles from './CurrencyList.module.scss';
import CurrencyListItem from './CurrencyListItem';

export function CurrencyList({ currencies }: { currencies: Currency[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th align="right"></th>
          <th align="left">Name</th>
          <th>Volume (30d)</th>
          <th align="right">Price</th>
          <th align="right">24h %</th>
        </tr>
      </thead>
      <tbody>
        {currencies.map(currency => (
          <CurrencyListItem key={currency.pk()} currency={currency} />
        ))}
      </tbody>
    </table>
  );
}
