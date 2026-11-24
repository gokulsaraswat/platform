import type { ReactNode } from 'react';
import { cx } from './cx.js';

export interface StateProps {
  title: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/** Empty screen: say what belongs here and offer the action that fills it. */
export function EmptyState({ title, children, icon, actions, className }: StateProps) {
  return (
    <div className={cx('gk-state', className)}>
      {icon && <div className="gk-state__icon" aria-hidden="true">{icon}</div>}
      <h2 className="gk-state__title">{title}</h2>
      {children && <p className="gk-state__body">{children}</p>}
      {actions && <div className="gk-state__actions">{actions}</div>}
    </div>
  );
}

/** Failure: say what went wrong and how to recover (retry, go back). */
export function ErrorState({ title, children, icon, actions, className }: StateProps) {
  return (
    <div role="alert" className={cx('gk-state gk-state--error', className)}>
      {icon && <div className="gk-state__icon" aria-hidden="true">{icon}</div>}
      <h2 className="gk-state__title">{title}</h2>
      {children && <p className="gk-state__body">{children}</p>}
      {actions && <div className="gk-state__actions">{actions}</div>}
    </div>
  );
}
