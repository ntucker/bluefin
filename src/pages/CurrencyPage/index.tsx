import { CurrencyDetail } from '@/components/CurrencyDetail/CurrencyDetail';

export default function CurrencyPage({ id }: { id: string }) {
  const width = 600;
  const height = 400;
  return (
    <div style={{ textAlign: 'left' }}>
      <CurrencyDetail width={width} height={height} id={id} />
    </div>
  );
}
