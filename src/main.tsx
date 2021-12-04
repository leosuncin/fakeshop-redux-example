import './index.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './app/store';

if (import.meta.env.DEV) {
  const { setupWorker } = await import('msw');
  const handlers = await import('./mocks/handlers');
  const worker = setupWorker(...Object.values(handlers));

  await worker.start({ onUnhandledRequest: 'bypass' });
}

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
