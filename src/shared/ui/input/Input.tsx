import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'id'
> & {
  id: string
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { id, label, type = 'text', error, className = '', ...rest },
    ref,
  ) {
    return (
      <div className={styles.field}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className}`.trim()}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {error ? (
          <span id={`${id}-error`} className={styles.error} role="alert">
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);
