import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parsePortfolioSetting,
  isPortfolioSettingKey,
  privatePortfolioSettingKeys,
  slugSchema,
  commentInputSchema,
  contactInputSchema,
  footerLinkSchema,
  socialsSchema,
  portfolioSettingSchemas,
} from '../dist/index.js';

test('settings: accepts the contract defaults', () => {
  assert.equal(parsePortfolioSetting('theme.default', 'system'), 'system');
  assert.equal(parsePortfolioSetting('comments.moderation', 'pending'), 'pending');
  assert.equal(parsePortfolioSetting('hero.open_to_work', false), false);
  const ctas = [
    { label: 'View My Work', href: '/projects', variant: 'primary' },
    { label: 'Get in Touch', href: '/contact', variant: 'secondary' },
  ];
  assert.deepEqual(parsePortfolioSetting('hero.ctas', ctas), ctas);
  const sections = { blog: true, projects: true, courses: true, snippets: true, comments: true, contact: true, chat: false };
  assert.deepEqual(parsePortfolioSetting('sections', sections), sections);
});

test('settings: rejects unknown keys and bad values', () => {
  assert.throws(() => parsePortfolioSetting('no.such.key', 1));
  assert.equal(isPortfolioSettingKey('toString'), false);
  assert.throws(() => parsePortfolioSetting('theme.default', 'blue'));
  assert.throws(() => parsePortfolioSetting('site.url', 'http://insecure.example'));
  assert.throws(() => parsePortfolioSetting('hero.ctas', [{ label: 'x', href: 'javascript:alert(1)', variant: 'primary' }]));
  assert.throws(() => parsePortfolioSetting('sections', { blog: true }));
});

test('private settings are a subset of the known keys', () => {
  assert.deepEqual([...privatePortfolioSettingKeys], ['contact.notify_email', 'contact.phone']);
  for (const key of privatePortfolioSettingKeys) assert.ok(key in portfolioSettingSchemas);
});

test('slugs', () => {
  for (const ok of ['a', 'my-first-post', 'c-17']) assert.ok(slugSchema.safeParse(ok).success, ok);
  for (const bad of ['', 'My-Post', 'a--b', '-a', 'a-', 'a b', 'a_b']) assert.ok(!slugSchema.safeParse(bad).success, bad);
});

test('comment and contact input limits match the RPC rules', () => {
  const id = '3f2b8f0e-5c1a-4c1e-9d3a-0a1b2c3d4e5f';
  const base = { entity_type: 'post', entity_id: id, name: ' Ada ', body: ' Nice post ' };
  const ok = commentInputSchema.parse(base);
  assert.equal(ok.name, 'Ada');
  assert.equal(ok.parent_id, null);
  assert.ok(!commentInputSchema.safeParse({ ...base, entity_type: 'comment' }).success);
  assert.ok(!commentInputSchema.safeParse({ ...base, body: 'x' }).success);
  assert.ok(!commentInputSchema.safeParse({ ...base, body: 'x'.repeat(4001) }).success);
  assert.ok(!commentInputSchema.safeParse({ ...base, email: 'not-an-email' }).success);
  assert.ok(contactInputSchema.safeParse({ name: 'A', email: 'a@b.co', body: 'hi' }).success);
  assert.ok(!contactInputSchema.safeParse({ name: 'A', email: 'a@b.co', subject: 's'.repeat(201), body: 'hi' }).success);
});

test('footer links and socials only allow safe URLs', () => {
  assert.ok(footerLinkSchema.safeParse({ group_name: 'work', label: 'Projects', href: '/projects' }).success);
  assert.ok(footerLinkSchema.safeParse({ group_name: 'elsewhere', label: 'Email', href: 'mailto:a@b.co', external: true }).success);
  assert.ok(!footerLinkSchema.safeParse({ group_name: 'work', label: 'x', href: 'javascript:alert(1)' }).success);
  assert.ok(!footerLinkSchema.safeParse({ group_name: 'other', label: 'x', href: '/x' }).success);
  assert.ok(socialsSchema.safeParse({ github: 'https://github.com/x' }).success);
  assert.ok(!socialsSchema.safeParse({ github: 'github.com/x' }).success);
});
