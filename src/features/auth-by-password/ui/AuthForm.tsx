import { APP_TEXT, DOM_IDS } from '@/shared/constants';
import { Button, Input } from '@/shared/ui';

import type { AuthSuccessPayload } from '../model/useLoginForm';
import { useLoginForm } from '../model/useLoginForm';
import styles from './AuthForm.module.scss';

type AuthFormProps = {
  onSuccess?: (payload: AuthSuccessPayload) => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const {
    onSubmit,
    loginRegister,
    passwordRegister,
    errors,
    isSubmitting,
    rootError,
  } = useLoginForm({ onSuccess });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Input
        id={DOM_IDS.authLoginInput}
        label={APP_TEXT.auth.loginLabel}
        type="text"
        autoComplete="username"
        placeholder={APP_TEXT.auth.loginPlaceholder}
        disabled={isSubmitting}
        error={errors.login?.message}
        {...loginRegister}
      />
      <Input
        id={DOM_IDS.authPasswordInput}
        label={APP_TEXT.auth.passwordLabel}
        type="password"
        autoComplete="current-password"
        placeholder={APP_TEXT.auth.passwordPlaceholder}
        disabled={isSubmitting}
        error={errors.password?.message}
        {...passwordRegister}
      />
      {rootError ? (
        <p className={styles.formError} role="alert">
          {rootError}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? APP_TEXT.auth.submitting : APP_TEXT.auth.submit}
      </Button>
    </form>
  );
}
