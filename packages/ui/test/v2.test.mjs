import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { audit } from '../scripts/contrast.mjs';
import * as v1 from '../dist/index.js';
import * as v2 from '../dist/v2/index.js';

const read = (f) => readFileSync(new URL(`../src/${f}`, import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const source = JSON.parse(readFileSync(new URL('../src/v2/flavors.json', import.meta.url), 'utf8'));
const tokens = read('v2/tokens.css');
const declared = new Set([...tokens.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
const referenced = (css) => new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
const local = (name) => name.startsWith('--_');

test('generated files are in sync with flavors.json', () => {
  const gen = fileURLToPath(new URL('../scripts/gen.mjs', import.meta.url));
  assert.doesNotThrow(() => execFileSync(process.execPath, [gen, '--check'], { stdio: 'pipe' }), 'run npm run gen -w @gokulsaraswat/ui');
});

test('every flavor defines the same color tokens in light and dark', () => {
  const [first, ...rest] = Object.values(source.flavors);
  const keys = Object.keys(first.light).sort();
  for (const f of [first, ...rest]) {
    assert.deepEqual(Object.keys(f.light).sort(), keys, `${f.label} light`);
    assert.deepEqual(Object.keys(f.dark).sort(), keys, `${f.label} dark`);
    for (const v of [...Object.values(f.light), ...Object.values(f.dark)]) assert.match(v, /^(#[0-9A-F]{6}|rgba\(.+\)|\d+ \d+ \d+)$/);
  }
});

test('every text and UI color pair meets WCAG 2.2 AA in every flavor and theme', () => {
  const failing = audit(source.flavors).filter((r) => !r.ok);
  assert.deepEqual(failing, []);
});

test('v2 css only references declared v2 tokens', () => {
  for (const file of ['v2/components.css', 'v2/tailwind.css', 'v2/tokens.css']) {
    for (const name of referenced(read(file))) assert.ok(declared.has(name) || local(name), `${file}: ${name} undefined`);
  }
});

test('v2 is additive: v1 exports and token names are untouched, v2 names never collide', () => {
  for (const name of ['Footer', 'LegalPage', 'footerPages', 'pagePath']) assert.ok(name in v1, `v1 lost ${name}`);
  for (const name of declared) assert.ok(name.startsWith('--gk-') || name === 'color-scheme', `${name} is not gk-namespaced`);
  const components = read('v2/components.css');
  for (const cls of ['gk-footer', 'gk-legal']) assert.doesNotMatch(components, new RegExp(`\\.${cls}\\b`));
});

test('flavors export matches the source', () => {
  assert.deepEqual([...v2.flavorNames], Object.keys(source.flavors));
  assert.equal(v2.flavors.instrument.light.accent, source.flavors.instrument.light.accent);
});

test('Button maps variants and blocks clicks while loading', () => {
  assert.equal(renderToStaticMarkup(h(v2.Button, null, 'Save')), '<button type="button" class="gk-btn">Save</button>');
  const html = renderToStaticMarkup(h(v2.Button, { variant: 'primary', size: 'sm', loading: true }, 'Publish'));
  assert.match(html, /class="gk-btn gk-btn--primary gk-btn--sm"/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /<span aria-hidden="true" class="gk-spinner"><\/span>Publish/);
});

test('Field wires label, hint and error to the control', () => {
  const html = renderToStaticMarkup(
    h(v2.Field, { label: 'Email', hint: 'Used for sign-in', error: 'Enter an email address' }, h(v2.Input, { id: 'email', type: 'email' })),
  );
  assert.match(html, /<label class="gk-label" for="email">Email<\/label>/);
  assert.match(html, /id="email"[^>]*aria-describedby="email-hint email-error"[^>]*aria-invalid="true"/);
  assert.match(html, /<p class="gk-field-error" id="email-error">Enter an email address<\/p>/);
});

test('Switch is a native checkbox with role=switch', () => {
  const html = renderToStaticMarkup(h(v2.Switch, { label: 'Show on hub', defaultChecked: true }));
  assert.match(html, /<input type="checkbox" role="switch" class="gk-switch" checked=""\/>/);
});

test('Alert, Badge and states pick roles and tones', () => {
  assert.match(renderToStaticMarkup(h(v2.Alert, { tone: 'danger', title: 'Save failed' }, 'x')), /^<div role="alert" class="gk-alert gk-alert--danger">/);
  assert.match(renderToStaticMarkup(h(v2.Alert, null, 'x')), /^<div role="status" class="gk-alert">/);
  assert.equal(renderToStaticMarkup(h(v2.Badge, { tone: 'success' }, 'Live')), '<span class="gk-badge gk-badge--success">Live</span>');
  assert.match(renderToStaticMarkup(h(v2.ErrorState, { title: 'Could not load roles' })), /role="alert" class="gk-state gk-state--error"/);
  assert.match(renderToStaticMarkup(h(v2.EmptyState, { title: 'No apps yet' })), /<h2 class="gk-state__title">No apps yet<\/h2>/);
});

test('Tabs use roving tabindex and link to panels', () => {
  const html = renderToStaticMarkup(
    h(v2.Tabs, { tabs: [{ id: 'a', label: 'Edit' }, { id: 'b', label: 'Preview' }], value: 'b', onChange() {}, label: 'Mode', idPrefix: 'm' }),
  );
  assert.match(html, /role="tablist" aria-label="Mode"/);
  assert.match(html, /id="m-tab-a" aria-controls="m-panel-a" aria-selected="false" tabindex="-1"/);
  assert.match(html, /id="m-tab-b" aria-controls="m-panel-b" aria-selected="true" tabindex="0"/);
  assert.deepEqual(v2.tabPanelProps('m', 'a', 'b'), { role: 'tabpanel', id: 'm-panel-a', 'aria-labelledby': 'm-tab-a', hidden: true, tabIndex: 0 });
});

test('Dialog renders closed on the server with a labelled title', () => {
  const html = renderToStaticMarkup(h(v2.Dialog, { open: false, onClose() {}, title: 'Delete app?' }, 'x'));
  assert.match(html, /^<dialog class="gk-dialog" aria-labelledby="([^"]+)">.*<h2 class="gk-dialog__title" id="\1">Delete app\?<\/h2>/);
  assert.doesNotMatch(html, / open/);
});
