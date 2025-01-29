import { useSuspense } from '@data-client/react';
import { memo } from 'react';

import { Holding, HoldingResource } from '@/resources/Holding';

import { formatLargePrice } from '../formatters';

function HoldingsList() {
  const holdings = useSuspense(HoldingResource.getList);

  return (
    <div>
      {holdings.map(holding => (
        <MemoizedHoldingListItem key={holding.id} holding={holding} />
      ))}
    </div>
  );
}

function HoldingListItem({ holding }: { holding: Holding }) {
  return (
    <div>
      {holding.currency?.name} - {formatLargePrice.format(holding.value)}
    </div>
  );
}

const MemoizedHoldingListItem = memo(HoldingListItem);

export default memo(HoldingsList);
