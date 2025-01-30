import { useSuspense } from '@data-client/react';

import CurrencyDetail from '@/components/CurrencyDetail/CurrencyDetail';
import { CurrencyResource } from '@/resources/Currency';

const width = 600;
const height = 400;

export default function CurrencyPage({ id }: { id: string }) {
  const currency = useSuspense(CurrencyResource.get, { id });

  return (
    <div style={{ textAlign: 'left' }}>
      <CurrencyDetail width={width} height={height} currency={currency} />
    </div>
  );
}
