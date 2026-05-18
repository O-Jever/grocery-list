import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { APP_TEXT, DOM_IDS } from '@/shared/constants';

const rootEl = document.getElementById(DOM_IDS.root);
if (!rootEl) {
  throw new Error(APP_TEXT.app.rootElementNotFound);
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
