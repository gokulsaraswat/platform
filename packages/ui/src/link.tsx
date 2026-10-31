import type { ComponentType, ReactNode } from 'react';

export interface LinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Router link to use instead of <a> (e.g. next/link). Must accept href, className and children. */
export type LinkComponent = ComponentType<LinkProps>;

export const Anchor: LinkComponent = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);
