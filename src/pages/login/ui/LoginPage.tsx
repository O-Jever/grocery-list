import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/store/hooks';
import { setUser } from '@/entities/session';
import type { AuthSuccessPayload } from '@/features/auth-by-password';
import { ROUTES } from '@/shared/config/routes';
import { LoginCard } from '@/widgets/login-card';

import styles from './LoginPage.module.scss';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAuthSuccess = ({ login }: AuthSuccessPayload) => {
    dispatch(setUser({ login }));
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <div className={styles.page}>
      <LoginCard onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}
