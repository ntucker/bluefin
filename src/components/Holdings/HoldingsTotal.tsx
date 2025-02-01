import { useQuery } from '@data-client/react';
import NumberFlow from '@number-flow/react';

import { HoldingResource } from '@/resources/Holding';

export default function HoldingsTotal() {
  const total = useQuery(HoldingResource.total) ?? 0;
  return (
    <span>
      Total Value:{' '}
      <NumberFlow
        value={total}
        format={{
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          maximumSignificantDigits: 4,
          minimumSignificantDigits: 4,
        }}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      />
    </span>
  );
}
