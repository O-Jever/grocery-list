import styles from './Count.module.scss';

type CountProps = {
  count: number;
};

export function Count({ count }: CountProps) {
  return (
    <div className={styles.count}>{count}</div>
  );
}