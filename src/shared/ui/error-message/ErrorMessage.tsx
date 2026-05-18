import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  title: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  title,
  message,
  retryLabel,
  onRetry,
}: ErrorMessageProps) {
  return (
    <section className={styles.errorMessage}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text} role="alert">
        {message}
      </p>
      {onRetry && retryLabel ? (
        <button type="button" className={styles.retry} onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </section>
  );
}
