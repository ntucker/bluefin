import { Link, useShowLoading } from '@anansi/router';
import { Layout, Menu, Spin, Affix, MenuProps } from 'antd';
import { memo, useMemo } from 'react';

import HoldingsTotal from './Holdings/HoldingsTotal';
import TradeNav from './TradeNav';

const { Header } = Layout;

function NavBar() {
  const loading = useShowLoading(150);

  const leftMenuItems = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        key: 'home',
        label: <Link name="Home">Bluefin Cryptos</Link>,
      },
    ];

    return items;
  }, []);
  const rightMenuItems = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        key: 'assets',
        label: <HoldingsTotal />,
      },
      {
        key: 'trade',
        label: <TradeNav />,
      },
    ];

    items.unshift({
      key: 'loading',
      label: loading && <Spin />,
    });
    return items;
  }, [loading]);
  return (
    <Affix offsetTop={0}>
      <Header className="header">
        <div className="logo" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={leftMenuItems}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={rightMenuItems}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </Header>
    </Affix>
  );
}
export default memo(NavBar);
