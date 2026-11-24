import {
  cloneElement,
  isValidElement,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from './cx.js';

interface ControlA11y {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
}

export interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  /** Error text; also marks the control aria-invalid. */
  error?: ReactNode;
  className?: string;
  /** Exactly one control (Input, Select, Textarea or a native element). */
  children: ReactElement<ControlA11y>;
}

/** Wires label, hint and error to the control by id. */
export function Field({ label, hint, error, className, children }: FieldProps) {
  const auto = useId();
  const id = (isValidElement(children) && children.props.id) || auto;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [children.props['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('gk-field', className)}>
      <label className="gk-label" htmlFor={id}>
        {label}
      </label>
      {cloneElement(children, { id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : children.props['aria-invalid'] })}
      {hint && (
        <p className="gk-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="gk-field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} className={cx('gk-input', className)} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...rest} className={cx('gk-textarea', className)} />;
}

export function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...rest} className={cx('gk-select', className)} />;
}

export interface CheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckProps) {
  return (
    <label className={cx('gk-check', className)}>
      <input {...rest} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}

export function Radio({ label, className, ...rest }: CheckProps) {
  return (
    <label className={cx('gk-check', className)}>
      <input {...rest} type="radio" />
      <span>{label}</span>
    </label>
  );
}

export function Switch({ label, className, ...rest }: CheckProps) {
  return (
    <label className={cx('gk-check', className)}>
      <input {...rest} type="checkbox" role="switch" className="gk-switch" />
      <span>{label}</span>
    </label>
  );
}
