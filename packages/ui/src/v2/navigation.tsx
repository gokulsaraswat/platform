import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface TabItem {
  id: string;
  label: ReactNode;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Accessible name of the tab list. */
  label: string;
  /** Prefix for tab/panel ids; panels use `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  className?: string;
}

/** WAI-ARIA tabs with roving tabindex and arrow/Home/End keys. Render panels with tabPanelProps(). */
export function Tabs({ tabs, value, onChange, label, idPrefix, className }: TabsProps) {
  const list = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === value);
    const last = tabs.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(tabs[next].id);
    list.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div ref={list} role="tablist" aria-label={label} className={cx('gk-tabs', className)} onKeyDown={onKeyDown}>
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${t.id}`}
          aria-controls={`${idPrefix}-panel-${t.id}`}
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          className="gk-tab"
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export const tabPanelProps = (idPrefix: string, id: string, active: string) => ({
  role: 'tabpanel' as const,
  id: `${idPrefix}-panel-${id}`,
  'aria-labelledby': `${idPrefix}-tab-${id}`,
  hidden: id !== active,
  tabIndex: 0,
});

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
