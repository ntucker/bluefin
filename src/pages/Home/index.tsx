import AssetPrice from './AssetPrice';

import { styled } from '@linaria/react';

const Head = styled.p`
  font-size: 30px;
`;


export default function Home() {
  return (
    <>
      <Head>
        Congrats! You&apos;ve created bluefin!
      </Head>
      <p style={{ fontSize: '15px' }}>
        Check out the generated ReadMe for instructions on how to use this
        library
      </p>
      <p style={{ fontSize: '24px' }}>
        <AssetPrice symbol="BTC" />
      </p>
    </>
  );
}
