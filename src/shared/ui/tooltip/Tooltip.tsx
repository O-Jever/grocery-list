import { type ReactNode, useId } from 'react';
import clsx from 'clsx';

import styles from './Tooltip.module.scss';

type TooltipProps = {
  content: string;
  children: ReactNode;
  align?: 'center' | 'right';
};

export function Tooltip({ content, children, align = 'center' }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span className={styles.tooltip} aria-describedby={tooltipId}>
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className={clsx(styles.content, align === 'right' && styles.contentRight)}
      >
        {content}
      </span>
    </span>
  );
}
