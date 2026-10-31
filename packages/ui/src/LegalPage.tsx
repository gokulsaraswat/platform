import { footerPages, type FooterPageSlug } from './pages.js';

export interface LegalPageProps {
  slug: FooterPageSlug;
  siteName: string;
  /** Shown as the contact line when set. */
  contactEmail?: string;
}

/** Placeholder body for a shared footer page until reviewed text exists. */
export function LegalPage({ slug, siteName, contactEmail }: LegalPageProps) {
  const page = footerPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown footer page: ${slug}`);

  return (
    <article className="gk-legal">
      <h1 className="gk-legal__title">{page.title}</h1>
      <p className="gk-legal__placeholder" data-placeholder="">
        Placeholder: the final {page.title} for {siteName} is pending review.
      </p>
      {contactEmail && (
        <p className="gk-legal__contact">
          Questions: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      )}
    </article>
  );
}
