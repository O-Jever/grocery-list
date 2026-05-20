import { APP_TEXT } from '@/shared/constants';

export function getErrorMessage(error: unknown, fallback: string = APP_TEXT.tasks.loadError) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as { data?: { message?: unknown } }).data?.message === 'string'
  ) {
    return (error as { data: { message: string } }).data.message;
  }
  return fallback;
}