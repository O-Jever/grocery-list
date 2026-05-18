import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

type RequireAuthProps = {
  children: ReactNode
};

export function RequireAuth({ children }: RequireAuthProps) {
  const isAuthed = useAppSelector(selectIsAuthenticated);
  if (!isAuthed) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return children;
}

type RequireGuestProps = {
  children: ReactNode
};

export function RequireGuest({ children }: RequireGuestProps) {
  const isAuthed = useAppSelector(selectIsAuthenticated);
  if (isAuthed) {
    return <Navigate to={ROUTES.home} replace />;
  }
  return children;
}
