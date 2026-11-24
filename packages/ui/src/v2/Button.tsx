import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from './cx.js';
import { Spinner } from './display.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, sets aria-busy and blocks clicks while keeping the label for screen readers. */
  loading?: boolean;
  /** Square icon-only button; pass an aria-label. */
  icon?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  icon = false,
  type = 'button',
  className,
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cx(
        'gk-btn',
        variant !== 'secondary' && `gk-btn--${variant}`,
        size !== 'md' && `gk-btn--${size}`,
        icon && 'gk-btn--icon',
        className,
      )}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
