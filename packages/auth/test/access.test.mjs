import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestAppAccess, ensureAppAccess } from '../dist/index.js';

const u = 'user-1';
const request = (status) => ({
  id: 'req-1',
  user_id: u,
  app: 'gspace',
  email: 'dee@test.invalid',
  name: null,
  status,
  requested_role: 'member',
  created_at: '2026-11-25T00:00:00Z',
  decided_at: null,
  decided_by: null,
});

const fakeClient = ({ roles = [], rpc = { data: null, error: null }, existing = { data: null, error: null } } = {}) => {
  const calls = [];
  const client = {
    rpc: async (fn, args) => (calls.push(['rpc', fn, args]), rpc),
    from: (table) => ({
      select: (cols) => {
        const filters = [];
        const chain = {
          eq: (col, val) => {
            filters.push([col, val]);
            if (table === 'user_roles') {
              calls.push(['select', table, cols, filters]);
              return Promise.resolve({ data: roles, error: null });
            }
            return chain;
          },
          maybeSingle: async () => (calls.push(['select', table, cols, filters]), existing),
        };
        return chain;
      },
    }),
  };
  return { client, calls };
};

test('requestAppAccess calls request_access and returns the row', async () => {
  const row = request('pending');
  const { client, calls } = fakeClient({ rpc: { data: row, error: null } });
  assert.deepEqual(await requestAppAccess(client, 'gspace'), row);
  assert.deepEqual(calls, [['rpc', 'request_access', { p_app: 'gspace' }]]);
  const error = Object.assign(new Error('Unknown app: x'), { code: '22023' });
  await assert.rejects(requestAppAccess(fakeClient({ rpc: { data: null, error } }).client, 'x'), error);
});

test('ensureAppAccess: admins, super admins and members file nothing', async () => {
  const cases = [
    [[{ user_id: u, app: '*', role: 'super_admin' }], 'admin'],
    [[{ user_id: u, app: 'gspace', role: 'admin' }], 'admin'],
    [[{ user_id: u, app: 'gspace', role: 'member' }], 'member'],
  ];
  for (const [roles, status] of cases) {
    const { client, calls } = fakeClient({ roles });
    assert.deepEqual(await ensureAppAccess(client, u, 'gspace'), { status, roles, request: null });
    assert.equal(calls.some((c) => c[0] === 'rpc'), false);
  }
});

test('ensureAppAccess files a request for users without a role', async () => {
  const roles = [{ user_id: u, app: 'gym', role: 'admin' }];
  for (const [status, expected] of [['pending', 'pending'], ['denied', 'denied'], ['approved', 'none']]) {
    const row = request(status);
    const { client, calls } = fakeClient({ roles, rpc: { data: row, error: null } });
    assert.deepEqual(await ensureAppAccess(client, u, 'gspace'), { status: expected, roles, request: row });
    assert.deepEqual(calls.at(-1), ['rpc', 'request_access', { p_app: 'gspace' }]);
  }
});

test('ensureAppAccess with fileRequest false only reads', async () => {
  const none = fakeClient();
  assert.deepEqual(await ensureAppAccess(none.client, u, 'studio', { fileRequest: false }), { status: 'none', roles: [], request: null });
  assert.deepEqual(none.calls.at(-1), ['select', 'access_requests', '*', [['user_id', u], ['app', 'studio']]]);
  assert.equal(none.calls.some((c) => c[0] === 'rpc'), false);

  const row = request('pending');
  const pending = fakeClient({ existing: { data: row, error: null } });
  assert.deepEqual(await ensureAppAccess(pending.client, u, 'gspace', { fileRequest: false }), { status: 'pending', roles: [], request: row });

  const error = new Error('permission denied');
  await assert.rejects(ensureAppAccess(fakeClient({ existing: { data: null, error } }).client, u, 'gspace', { fileRequest: false }), error);
});
