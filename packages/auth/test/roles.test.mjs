import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasRole, isSuperAdmin, getUserRoles } from '../dist/index.js';

const u = 'user-1';
const superAdmin = [{ user_id: u, app: '*', role: 'super_admin' }];
const gspaceAdmin = [{ user_id: u, app: 'gspace', role: 'admin' }];
const gymMember = [{ user_id: u, app: 'gym', role: 'member' }];

test('global super_admin passes every app and role', () => {
  assert.equal(isSuperAdmin(superAdmin), true);
  for (const app of ['hub', 'admin', 'portfolio', 'gspace', 'studio', 'gym'])
    for (const role of ['super_admin', 'admin', 'member']) assert.equal(hasRole(superAdmin, app, role), true);
});

test('per-app roles respect hierarchy and app', () => {
  assert.equal(isSuperAdmin(gspaceAdmin), false);
  assert.equal(hasRole(gspaceAdmin, 'gspace', 'member'), true);
  assert.equal(hasRole(gspaceAdmin, 'gspace', 'admin'), true);
  assert.equal(hasRole(gspaceAdmin, 'gspace', 'super_admin'), false);
  assert.equal(hasRole(gspaceAdmin, 'gym', 'member'), false);
  assert.equal(hasRole(gymMember, 'gym', 'admin'), false);
  assert.equal(hasRole([], 'hub', 'member'), false);
});

const fakeClient = (result, calls) => ({
  from: (table) => ({
    select: (cols) => ({
      eq: (col, val) => {
        calls.push({ table, cols, col, val });
        return Promise.resolve(result);
      },
    }),
  }),
});

test('getUserRoles queries user_roles for the user', async () => {
  const calls = [];
  const rows = await getUserRoles(fakeClient({ data: gspaceAdmin, error: null }, calls), u);
  assert.deepEqual(rows, gspaceAdmin);
  assert.deepEqual(calls, [{ table: 'user_roles', cols: 'user_id, app, role', col: 'user_id', val: u }]);
  assert.deepEqual(await getUserRoles(fakeClient({ data: null, error: null }, []), u), []);
});

test('getUserRoles throws Supabase errors', async () => {
  const error = new Error('permission denied');
  await assert.rejects(getUserRoles(fakeClient({ data: null, error }, []), u), error);
});
