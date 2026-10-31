/** Pages every app links from its footer. Slugs are paths relative to the app's base path. */
export const footerPages = [
  { slug: 'privacy', title: 'Privacy Policy' },
  { slug: 'terms', title: 'Terms of Service' },
  { slug: 'cookies', title: 'Cookie Policy' },
  { slug: 'data-deletion', title: 'Data Deletion Request' },
  { slug: 'accessibility', title: 'Accessibility Statement' },
  { slug: 'sitemap', title: 'Sitemap' },
  { slug: 'faq', title: 'FAQ' },
  { slug: 'about', title: 'About' },
  { slug: 'contact', title: 'Contact' },
] as const;

export type FooterPageSlug = (typeof footerPages)[number]['slug'];

/** Joins a base path (e.g. "/gspace") and a slug into an absolute path. */
export const pagePath = (basePath: string, slug: FooterPageSlug): string =>
  `${basePath.replace(/\/+$/, '')}/${slug}`;
