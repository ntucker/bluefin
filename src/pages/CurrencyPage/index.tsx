import { CurrencyDetail } from '@/components/CurrencyDetail/CurrencyDetail';

export default function CurrencyPage({ id }: { id: string }) {
  const width = 600;
  const height = 400;
  return (
    <>
      <CurrencyDetail width={width} height={height} id={id} />
    </>
  );
}
