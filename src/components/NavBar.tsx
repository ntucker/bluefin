import { Link, useShowLoading } from '@anansi/router';
import { Layout, Menu, Spin, Affix, MenuProps } from 'antd';
import { memo, useMemo } from 'react';

import HoldingsTotal from './Holdings/HoldingsTotal';

const { Header } = Layout;

function NavBar() {
  const loading = useShowLoading(150);

  const menuItems = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        key: 'home',
        label: <Link name="Home">Bluefin Cryptos</Link>,
      },
      {
        key: 'assets',
        label: <HoldingsTotal />,
      },
    ];

    items.push({
      key: 'loading',
      label: loading && <Spin />,
    });
    return items;
  }, [loading]);
  return (
    <Affix offsetTop={0}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={menuItems}
        />
      </Header>
    </Affix>
  );
}
export default memo(NavBar);
