import { useController } from '@data-client/react';
import Button from 'antd/es/button';
import { memo } from 'react';

import { Currency } from '@/resources/Currency';
import { HoldingResource } from '@/resources/Holding';

function TradeButtons({
  currency,
  small,
}: {
  currency: Currency;
  small?: boolean;
}) {
  const ctrl = useController();
  const size = small ? 'small' : 'middle';
  return (
    <div style={{ float: 'right' }}>
      <Button
        onClick={() => ctrl.fetch(HoldingResource.buy, currency.id, 1)}
        size={size}
      >
        Buy
      </Button>
      &nbsp;
      <Button
        onClick={() => ctrl.fetch(HoldingResource.buy, currency.id, -1)}
        size={size}
      >
        Sell
      </Button>
    </div>
  );
}
export default memo(TradeButtons);
