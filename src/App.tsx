import { Link, MatchedRoute } from '@anansi/router';
import { AsyncBoundary } from '@data-client/react';
import { Flex, Layout } from 'antd';
import { memo } from 'react';

import '@/style/main.css';
import HoldingsList from '@/components/Holdings/HoldingsList';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  // color: '#fff',
  // backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  minHeight: '100vh',
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Link name="Home">Bluefin trading</Link>
      </Header>
      <Layout>
        <Content style={contentStyle}>
          <AsyncBoundary>
            <MatchedRoute index={0} />
          </AsyncBoundary>
        </Content>
        <Sider width="250px">
          <HoldingsList />
        </Sider>
      </Layout>
      {/* <Footer style={footerStyle}>Bluefin footer</Footer> */}
    </Layout>
  );
}
export default memo(App);
