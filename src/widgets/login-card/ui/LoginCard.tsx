import { AuthForm, type AuthSuccessPayload } from '@/features/auth-by-password';
import { APP_TEXT } from '@/shared/constants';

import styles from './LoginCard.module.scss';

type LoginCardProps = {
  onAuthSuccess?: (payload: AuthSuccessPayload) => void
}

export function LoginCard({ onAuthSuccess }: LoginCardProps) {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>{APP_TEXT.auth.title}</h1>
      </header>
      <AuthForm onSuccess={onAuthSuccess} />
    </div>
  );
}
