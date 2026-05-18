import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/features/auth-by-password/api/authApi';
import { APP_TEXT, FORM_LIMITS } from '@/shared/constants';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';

export type LoginFormValues = {
  login: string
  password: string
}

export type AuthSuccessPayload = {
  login: string
}

type UseLoginFormOptions = {
  onSuccess?: (payload: AuthSuccessPayload) => void
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isRhfSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormValues>({
    defaultValues: { login: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async ({ login, password }) => {
    clearErrors('root');
    try {
      await loginMutation({
        login: login.trim(),
        password,
      }).unwrap();
      onSuccess?.({ login: login.trim() });
    } catch (err: unknown) {
      setError('root', {
        type: 'server',
        message: getErrorMessage(err),
      });
    }
  });

  const loginRegister = register('login', {
    required: APP_TEXT.auth.validation.loginRequired,
    minLength: {
      value: FORM_LIMITS.loginMinLength,
      message: APP_TEXT.auth.validation.loginMinLength,
    },
    maxLength: {
      value: FORM_LIMITS.loginMaxLength,
      message: APP_TEXT.auth.validation.loginMaxLength,
    },
    setValueAs: (v: string) => (typeof v === 'string' ? v.trimStart() : v),
  });

  const passwordRegister = register('password', {
    required: APP_TEXT.auth.validation.passwordRequired,
    minLength: {
      value: FORM_LIMITS.passwordMinLength,
      message: APP_TEXT.auth.validation.passwordMinLength,
    },
  });

  const isSubmitting = isRhfSubmitting || isLoginLoading;

  return {
    onSubmit,
    loginRegister,
    passwordRegister,
    errors,
    isSubmitting,
    rootError: errors.root?.message,
  };
}
