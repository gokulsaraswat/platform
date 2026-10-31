import type { ReactNode } from 'react';
import { Anchor, type LinkComponent } from './link.js';
import { footerPages, pagePath } from './pages.js';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial extends FooterLink {
  /** Optional icon; the label stays as the accessible name. */
  icon?: ReactNode;
}

export interface FooterProps {
  siteName: string;
  tagline?: string;
  /** Prefix for the shared footer pages, e.g. "/gspace". Default: root. */
  basePath?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  linkComponent?: LinkComponent;
  year?: number;
}

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

export function Footer({
  siteName,
  tagline,
  basePath = '',
  columns = [],
  socials = [],
  linkComponent: Link = Anchor,
  year = new Date().getFullYear(),
}: FooterProps) {
  const hasTop = Boolean(tagline) || columns.length > 0 || socials.length > 0;

  return (
    <footer className="gk-footer">
      <div className="gk-footer__inner">
        {hasTop && (
          <div className="gk-footer__top">
            <div className="gk-footer__brand">
              <p className="gk-footer__name">{siteName}</p>
              {tagline && <p className="gk-footer__tagline">{tagline}</p>}
              {socials.length > 0 && (
                <ul className="gk-footer__socials">
                  {socials.map((s) => (
                    <li key={s.href}>
                      <a
                        className="gk-footer__social"
                        href={s.href}
                        aria-label={s.icon ? s.label : undefined}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {s.icon ?? s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {columns.map((col) => (
              <nav key={col.title} className="gk-footer__column" aria-label={col.title}>
                <h2 className="gk-footer__heading">{col.title}</h2>
                <ul className="gk-footer__list">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {isExternal(l.href) ? (
                        <a className="gk-footer__link" href={l.href}>
                          {l.label}
                        </a>
                      ) : (
                        <Link className="gk-footer__link" href={l.href}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        )}
        <div className="gk-footer__bottom">
          <p className="gk-footer__copyright">
            &copy; {year} {siteName}. All rights reserved.
          </p>
          <nav aria-label="Legal and site information">
            <ul className="gk-footer__legal">
              {footerPages.map((p) => (
                <li key={p.slug}>
                  <Link className="gk-footer__link" href={pagePath(basePath, p.slug)}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
