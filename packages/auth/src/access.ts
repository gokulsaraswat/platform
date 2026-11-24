import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessRequest, AppId, UserRole } from '@gokulsaraswat/config';
import { getUserRoles } from './client.js';
import { hasRole } from './roles.js';

/** Files the signed-in user's `member` request for `app` (`request_access` RPC); returns the existing row unchanged if there is one. */
export async function requestAppAccess(client: SupabaseClient, app: AppId): Promise<AccessRequest> {
  const { data, error } = await client.rpc('request_access', { p_app: app });
  if (error) throw error;
  return data as AccessRequest;
}

/** `admin` includes super admins. `none`: no role and no request (only with `fileRequest: false`), or approved but the role was removed since. */
export type AppAccessStatus = 'admin' | 'member' | 'pending' | 'denied' | 'none';

export interface AppAccess {
  status: AppAccessStatus;
  roles: UserRole[];
  request: AccessRequest | null;
}

export interface EnsureAppAccessOptions {
  /** Default true: file a request when the user has no role and none exists. False only reads. */
  fileRequest?: boolean;
}

async function readRequest(client: SupabaseClient, userId: string, app: AppId): Promise<AccessRequest | null> {
  const { data, error } = await client.from('access_requests').select('*').eq('user_id', userId).eq('app', app).maybeSingle();
  if (error) throw error;
  return (data as AccessRequest | null) ?? null;
}

function statusOf(request: AccessRequest | null): AppAccessStatus {
  if (request?.status === 'pending') return 'pending';
  if (request?.status === 'denied') return 'denied';
  return 'none';
}

/**
 * Where a signed-in user stands in `app`. Members and admins get `request: null`; anyone else
 * gets their request, filed now if there was none. Shapes the UI only; RLS is the enforcement.
 */
export async function ensureAppAccess(
  client: SupabaseClient,
  userId: string,
  app: AppId,
  { fileRequest = true }: EnsureAppAccessOptions = {},
): Promise<AppAccess> {
  const roles = await getUserRoles(client, userId);
  if (hasRole(roles, app, 'admin')) return { status: 'admin', roles, request: null };
  if (hasRole(roles, app, 'member')) return { status: 'member', roles, request: null };
  const request = fileRequest ? await requestAppAccess(client, app) : await readRequest(client, userId, app);
  return { status: statusOf(request), roles, request };
}
