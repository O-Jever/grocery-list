import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { ROUTES } from '@/shared/config/routes';

import { RequireAuth, RequireGuest } from './AuthRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.login}
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
        <Route
          path={ROUTES.home}
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
