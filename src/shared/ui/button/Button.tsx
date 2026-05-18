import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'primary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.root} ${styles[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
