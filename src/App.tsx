import { MatchedRoute } from '@anansi/router';
import { AsyncBoundary } from '@data-client/react';
import { Layout } from 'antd';
import { memo } from 'react';

import '@/style/main.css';
import HoldingsList from '@/components/Holdings/HoldingsList';
import NavBar from '@/components/NavBar';

const { Sider, Content } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  minHeight: '100vh',
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <NavBar />
      <Layout style={{ background: 'white' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: '100%',
          }}
        >
          <AsyncBoundary>
            <MatchedRoute index={0} />
          </AsyncBoundary>
        </Content>
        <Sider width="250px">
          <HoldingsList />
        </Sider>
      </Layout>
    </Layout>
  );
}
export default memo(App);
