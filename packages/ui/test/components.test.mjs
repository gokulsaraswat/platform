import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Footer, LegalPage, footerPages, pagePath } from '../dist/index.js';

const hrefs = (html) => [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);

test('pagePath joins base path and slug', () => {
  assert.equal(pagePath('', 'privacy'), '/privacy');
  assert.equal(pagePath('/gspace', 'privacy'), '/gspace/privacy');
  assert.equal(pagePath('/gspace/', 'faq'), '/gspace/faq');
});

test('Footer links all shared pages under basePath', () => {
  const html = renderToStaticMarkup(h(Footer, { siteName: 'GSpace', basePath: '/gspace', year: 2026 }));
  const links = hrefs(html);
  for (const p of footerPages) assert.ok(links.includes(`/gspace/${p.slug}`), `missing ${p.slug}`);
  assert.match(html, /© 2026 GSpace\. All rights reserved\./);
  assert.doesNotMatch(html, /gk-footer__top/);
});

test('Footer renders columns and socials, routing internal links through linkComponent', () => {
  const RouterLink = ({ href, className, children }) => h('a', { href, className, 'data-router': '' }, children);
  const html = renderToStaticMarkup(
    h(Footer, {
      siteName: 'Portfolio',
      tagline: 'Backend engineer',
      columns: [{ title: 'Explore', links: [{ label: 'Blog', href: '/blog' }, { label: 'Ext', href: 'https://example.com' }] }],
      socials: [{ label: 'GitHub', href: 'https://github.com/gokulsaraswat', icon: h('svg') }],
      linkComponent: RouterLink,
    }),
  );
  assert.match(html, /<a href="\/blog" class="gk-footer__link" data-router="">Blog<\/a>/);
  assert.match(html, /<a class="gk-footer__link" href="https:\/\/example.com">Ext<\/a>/);
  assert.match(html, /aria-label="GitHub"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.equal((html.match(/data-router/g) ?? []).length, 1 + footerPages.length);
});

test('LegalPage renders a marked placeholder for every shared page', () => {
  for (const p of footerPages) {
    const html = renderToStaticMarkup(h(LegalPage, { slug: p.slug, siteName: 'Portfolio' }));
    assert.match(html, new RegExp(`<h1 class="gk-legal__title">${p.title}</h1>`));
    assert.match(html, /data-placeholder=""/);
    assert.doesNotMatch(html, /mailto:/);
  }
  const withEmail = renderToStaticMarkup(h(LegalPage, { slug: 'privacy', siteName: 'P', contactEmail: 'a@b.c' }));
  assert.match(withEmail, /href="mailto:a@b.c"/);
});

test('LegalPage rejects unknown slugs', () => {
  assert.throws(() => renderToStaticMarkup(h(LegalPage, { slug: 'nope', siteName: 'P' })), /Unknown footer page/);
});
