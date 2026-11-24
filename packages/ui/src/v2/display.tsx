import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './cx.js';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Hover lift + press feedback for cards that contain a single primary link or button. */
  interactive?: boolean;
}

export function Card({ interactive = false, className, ...rest }: CardProps) {
  return <div {...rest} className={cx('gk-card', interactive && 'gk-card--interactive', className)} />;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span {...rest} className={cx('gk-badge', tone !== 'neutral' && `gk-badge--${tone}`, className)} />;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: Exclude<Tone, 'neutral' | 'accent'>;
  title?: ReactNode;
}

/** danger/warning alerts announce immediately (role="alert"); others politely (role="status"). */
export function Alert({ tone = 'info', title, className, children, ...rest }: AlertProps) {
  const urgent = tone === 'danger' || tone === 'warning';
  return (
    <div role={urgent ? 'alert' : 'status'} {...rest} className={cx('gk-alert', tone !== 'info' && `gk-alert--${tone}`, className)}>
      {title && <p className="gk-alert__title">{title}</p>}
      {children}
    </div>
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: string;
  height?: string;
}

export function Skeleton({ width, height, className, style, ...rest }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={cx('gk-skeleton', className)}
      style={{ inlineSize: width, blockSize: height, ...style }}
    />
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Accessible label; omit when the surrounding control already says what is loading. */
  label?: string;
}

export function Spinner({ label, className, ...rest }: SpinnerProps) {
  return label ? (
    <span role="status" {...rest} className={cx('gk-spinner', className)}>
      <span className="gk-sr-only">{label}</span>
    </span>
  ) : (
    <span aria-hidden="true" {...rest} className={cx('gk-spinner', className)} />
  );
}

export function Kbd({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <kbd {...rest} className={cx('gk-kbd', className)} />;
}
