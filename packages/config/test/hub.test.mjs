import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHubConfig, appIds, roles, ALL_APPS } from '../dist/index.js';

const tile = (over = {}) => ({ id: 'gspace', name: 'GSpace', href: '/gspace', mode: 'bundled', enabled: true, ...over });

test('exports the agreed app ids and roles', () => {
  assert.deepEqual(appIds, ['hub', 'admin', 'portfolio', 'gspace', 'studio', 'gym']);
  assert.deepEqual(roles, ['super_admin', 'admin', 'member']);
  assert.equal(ALL_APPS, '*');
});

test('accepts a valid config', () => {
  const config = { version: 1, apps: [tile(), tile({ id: 'portfolio', href: 'https://example.vercel.app', mode: 'external' })] };
  assert.deepEqual(parseHubConfig(config), config);
});

test('rejects invalid configs', () => {
  const bad = [
    { version: 2, apps: [] },
    { version: 1, apps: [tile({ id: 'unknown' })] },
    { version: 1, apps: [tile({ mode: 'iframe' })] },
    { version: 1, apps: [tile({ mode: 'external', href: '/gspace' })] },
    { version: 1, apps: [tile({ mode: 'external', href: 'http://insecure.example' })] },
    { version: 1, apps: [tile({ href: 'gspace' })] },
    { version: 1, apps: [tile({ name: '' })] },
    { version: 1, apps: [tile(), tile()] },
  ];
  for (const config of bad) assert.throws(() => parseHubConfig(config), JSON.stringify(config));
});
