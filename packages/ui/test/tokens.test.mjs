import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (f) => readFileSync(new URL(`../src/${f}`, import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const tokens = read('tokens.css');
const tailwind = read('tailwind.css');

const block = (css, selector) => {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `missing ${selector} block`);
  return css.slice(start, css.indexOf('\n}', start));
};
const declared = (css) => new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
const referenced = (css) => new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));

const root = declared(block(tokens, ':root'));
const dark = declared(block(tokens, '.dark'));
const external = new Set(['--font-geist-sans', '--font-geist-mono']);

test('every dark override exists in :root', () => {
  for (const name of dark) assert.ok(root.has(name), `${name} only in .dark`);
});

test('every :root color has a dark value', () => {
  const themeIndependent = /^--(radius|font|text|shadow|motion)/;
  for (const name of root) if (!themeIndependent.test(name)) assert.ok(dark.has(name), `${name} missing in .dark`);
});

test('tokens.css only references declared or app-provided vars', () => {
  for (const name of referenced(tokens)) assert.ok(root.has(name) || external.has(name), `${name} undefined`);
});

test('tailwind.css maps only declared tokens', () => {
  for (const name of referenced(tailwind)) assert.ok(root.has(name), `${name} not in tokens.css`);
});
