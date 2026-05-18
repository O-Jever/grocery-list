import clsx from 'clsx';

import styles from './Loading.module.scss';

type LoadingProps = {
  isLoading: boolean;
  fullPage?: boolean;
  size?: keyof typeof SizeLoading;
};

enum SizeLoading {
  small = 'small',
  big = 'big',
}

export function Loading({ isLoading, fullPage = true, size = 'big' }: LoadingProps) {
  return (
    <div
      className={clsx(styles.loading, fullPage && styles.fullPage)}
      aria-busy={isLoading}
    >
      {isLoading ? 
        <div className={clsx(styles.loadingAnimation, styles[size])} />
      : null}
    </div>
  );
}