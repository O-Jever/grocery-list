import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { APP_TEXT, DOM_IDS } from '@/shared/constants';

async function enableMocks() {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') {
    return;
  }

  const { worker } = await import('@/shared/api/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const rootEl = document.getElementById(DOM_IDS.root);
if (!rootEl) {
  throw new Error(APP_TEXT.app.rootElementNotFound);
}

await enableMocks();

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
