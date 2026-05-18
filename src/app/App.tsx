import './styles/app.scss';

import type { ReactNode } from 'react';

import { AppRouter } from './providers/AppRouter';
import { StoreProvider } from './providers/StoreProvider';

export function App(): ReactNode {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
