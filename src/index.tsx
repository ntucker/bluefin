import ReactDOM from 'react-dom/client';

import '@ant-design/v5-patch-for-react-19';
import App from './App';
import getManagers from './getManagers';
import RootProvider from './RootProvider';

const content = (
  <RootProvider managers={getManagers()}>
    <App />
  </RootProvider>
);

ReactDOM.createRoot(document.getElementById('react') || document.body).render(
  content,
);
