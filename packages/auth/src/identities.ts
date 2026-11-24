import type { SupabaseClient, UserIdentity } from '@supabase/supabase-js';

/** A sign-in method attached to the user, e.g. `google`, `github` or `email`. */
export interface LinkedIdentity {
  provider: string;
  /** Pass to `unlinkProvider`. Same as `UserIdentity.identity_id`. */
  identityId: string;
  email: string | null;
  createdAt: string | null;
  raw: UserIdentity;
}

export type IdentityErrorCode = 'last_identity' | 'identity_not_found';

/** Thrown by `unlinkProvider` before anything is removed. */
export class IdentityError extends Error {
  readonly code: IdentityErrorCode;

  constructor(code: IdentityErrorCode, message: string) {
    super(message);
    this.name = 'IdentityError';
    this.code = code;
  }
}

const normalize = (raw: UserIdentity): LinkedIdentity => ({
  provider: raw.provider,
  identityId: raw.identity_id,
  email: typeof raw.identity_data?.email === 'string' ? raw.identity_data.email : null,
  createdAt: raw.created_at ?? null,
  raw,
});

/** Sign-in methods of the signed-in user, oldest first. Throws the Supabase error (e.g. when signed out). */
export async function listIdentities(client: SupabaseClient): Promise<LinkedIdentity[]> {
  const { data, error } = await client.auth.getUserIdentities();
  if (error) throw error;
  return (data?.identities ?? []).map(normalize).sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''));
}

/**
 * Removes one sign-in method. Re-reads the user's identities first and throws `IdentityError`
 * with `last_identity` if it is the only one, or `identity_not_found` if it is not linked.
 */
export async function unlinkProvider(client: SupabaseClient, identity: Pick<LinkedIdentity, 'identityId'>): Promise<void> {
  const current = await listIdentities(client);
  const target = current.find((i) => i.identityId === identity.identityId);
  if (!target) throw new IdentityError('identity_not_found', 'That sign-in method is not linked to this account');
  if (current.length < 2) throw new IdentityError('last_identity', 'Cannot remove the only sign-in method');
  const { error } = await client.auth.unlinkIdentity(target.raw);
  if (error) throw error;
}
