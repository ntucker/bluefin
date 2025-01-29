import { MatchedRoute } from '@anansi/router';
import { AsyncBoundary } from '@data-client/react';
import { memo } from 'react';

import '@/style/main.css';

// Typically place global navigation and routing layer in here
function App() {
  return (
    <div>
      <nav>Bluefin trading</nav>
      <main>
        <AsyncBoundary>
          <MatchedRoute index={0} />
        </AsyncBoundary>
      </main>
    </div>
  );
}
export default memo(App);
