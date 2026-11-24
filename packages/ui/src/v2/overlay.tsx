import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface DialogProps {
  open: boolean;
  /** Called on Escape, backdrop click or a close button; the parent sets open=false. */
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Native modal <dialog>: focus trap, Escape and top-layer come from the browser. */
export function Dialog({ open, onClose, title, children, footer, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx('gk-dialog', className)}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gk-dialog__header">
        <h2 className="gk-dialog__title" id={titleId}>
          {title}
        </h2>
      </div>
      {children && <div className="gk-dialog__body">{children}</div>}
      {footer && <div className="gk-dialog__footer">{footer}</div>}
    </dialog>
  );
}

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export interface ToastItem {
  id: string | number;
  tone?: ToastTone;
  message: ReactNode;
  action?: ReactNode;
}

export interface ToastRegionProps {
  toasts: readonly ToastItem[];
  className?: string;
}

/** Presentational live region; the app owns the queue and timeouts. */
export function ToastRegion({ toasts, className }: ToastRegionProps) {
  return (
    <div className={cx('gk-toast-region', className)} role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={cx('gk-toast', t.tone && t.tone !== 'info' && `gk-toast--${t.tone}`)} role={t.tone === 'danger' ? 'alert' : 'status'}>
          <div>{t.message}</div>
          {t.action}
        </div>
      ))}
    </div>
  );
}
