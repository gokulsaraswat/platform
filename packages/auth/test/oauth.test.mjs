import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTH_PROVIDERS,
  isAuthProviderId,
  signInWithProvider,
  linkProvider,
  listIdentities,
  unlinkProvider,
  IdentityError,
} from '../dist/index.js';

const identity = (provider, created_at, email = `${provider}@test.invalid`) => ({
  id: `${provider}-row`,
  user_id: 'user-1',
  identity_id: `${provider}-id`,
  provider,
  identity_data: { email },
  created_at,
});

const fakeAuth = (overrides = {}) => {
  const calls = [];
  const auth = {
    signInWithOAuth: async (args) => (calls.push(['signInWithOAuth', args]), { data: { provider: args.provider, url: `https://sb.test.invalid/authorize?provider=${args.provider}` }, error: null }),
    linkIdentity: async (args) => (calls.push(['linkIdentity', args]), { data: { provider: args.provider, url: `https://sb.test.invalid/user/identities/authorize?provider=${args.provider}` }, error: null }),
    getUserIdentities: async () => (calls.push(['getUserIdentities']), { data: { identities: [] }, error: null }),
    unlinkIdentity: async (raw) => (calls.push(['unlinkIdentity', raw]), { data: {}, error: null }),
    ...overrides,
  };
  return { client: { auth }, calls };
};

test('AUTH_PROVIDERS lists Google then GitHub', () => {
  assert.deepEqual(AUTH_PROVIDERS, [
    { id: 'google', label: 'Google' },
    { id: 'github', label: 'GitHub' },
  ]);
  assert.equal(isAuthProviderId('github'), true);
  assert.equal(isAuthProviderId('email'), false);
  assert.equal(isAuthProviderId(undefined), false);
});

test('signInWithProvider passes provider and options, returns the authorize URL', async () => {
  const { client, calls } = fakeAuth();
  const options = { redirectTo: 'https://app.test.invalid/auth/callback?next=/' };
  const start = await signInWithProvider(client, 'github', options);
  assert.deepEqual(start, { provider: 'github', url: 'https://sb.test.invalid/authorize?provider=github' });
  assert.deepEqual(calls, [['signInWithOAuth', { provider: 'github', options }]]);
});

test('linkProvider calls linkIdentity', async () => {
  const { client, calls } = fakeAuth();
  const options = { redirectTo: 'https://app.test.invalid/auth/callback?next=/account', skipBrowserRedirect: true };
  const start = await linkProvider(client, 'google', options);
  assert.equal(start.url, 'https://sb.test.invalid/user/identities/authorize?provider=google');
  assert.deepEqual(calls, [['linkIdentity', { provider: 'google', options }]]);
});

test('OAuth helpers throw Supabase errors and missing URLs', async () => {
  const error = new Error('provider is not enabled');
  const failing = fakeAuth({ signInWithOAuth: async () => ({ data: { url: null }, error }) }).client;
  await assert.rejects(signInWithProvider(failing, 'github', { redirectTo: 'x' }), error);
  const empty = fakeAuth({ linkIdentity: async () => ({ data: { url: '' }, error: null }) }).client;
  await assert.rejects(linkProvider(empty, 'github', { redirectTo: 'x' }), /no authorize URL/);
});

test('listIdentities normalizes and sorts oldest first', async () => {
  const github = identity('github', '2026-11-02T00:00:00Z');
  const google = identity('google', '2026-11-01T00:00:00Z');
  const { client } = fakeAuth({ getUserIdentities: async () => ({ data: { identities: [github, google] }, error: null }) });
  assert.deepEqual(await listIdentities(client), [
    { provider: 'google', identityId: 'google-id', email: 'google@test.invalid', createdAt: '2026-11-01T00:00:00Z', raw: google },
    { provider: 'github', identityId: 'github-id', email: 'github@test.invalid', createdAt: '2026-11-02T00:00:00Z', raw: github },
  ]);
  const bare = { ...identity('email', undefined), identity_data: undefined };
  const one = fakeAuth({ getUserIdentities: async () => ({ data: { identities: [bare] }, error: null }) }).client;
  assert.deepEqual(await listIdentities(one), [{ provider: 'email', identityId: 'email-id', email: null, createdAt: null, raw: bare }]);
  const error = new Error('Auth session missing!');
  await assert.rejects(listIdentities(fakeAuth({ getUserIdentities: async () => ({ data: null, error }) }).client), error);
});

test('unlinkProvider removes one of several identities with the raw row', async () => {
  const google = identity('google', '2026-11-01T00:00:00Z');
  const github = identity('github', '2026-11-02T00:00:00Z');
  const { client, calls } = fakeAuth({ getUserIdentities: async () => ({ data: { identities: [google, github] }, error: null }) });
  await unlinkProvider(client, { identityId: 'github-id' });
  assert.deepEqual(calls, [['unlinkIdentity', github]]);
});

test('unlinkProvider refuses the last identity and unknown ids', async () => {
  const google = identity('google', '2026-11-01T00:00:00Z');
  const { client, calls } = fakeAuth({ getUserIdentities: async () => ({ data: { identities: [google] }, error: null }) });
  await assert.rejects(unlinkProvider(client, { identityId: 'google-id' }), (e) => e instanceof IdentityError && e.code === 'last_identity');
  await assert.rejects(unlinkProvider(client, { identityId: 'nope' }), (e) => e instanceof IdentityError && e.code === 'identity_not_found');
  assert.deepEqual(calls, []);
});

test('unlinkProvider throws the Supabase error', async () => {
  const error = new Error('Manual linking is disabled');
  const ids = [identity('google', '1'), identity('github', '2')];
  const { client } = fakeAuth({
    getUserIdentities: async () => ({ data: { identities: ids }, error: null }),
    unlinkIdentity: async () => ({ data: null, error }),
  });
  await assert.rejects(unlinkProvider(client, { identityId: 'google-id' }), error);
});
