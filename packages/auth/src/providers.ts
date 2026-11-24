import type { SupabaseClient } from '@supabase/supabase-js';

/** OAuth providers every app offers, in display order. Each must be enabled in Supabase Auth > Providers. */
export const AUTH_PROVIDERS = [
  { id: 'google', label: 'Google' },
  { id: 'github', label: 'GitHub' },
] as const;

export type AuthProviderId = (typeof AUTH_PROVIDERS)[number]['id'];

export const isAuthProviderId = (value: unknown): value is AuthProviderId =>
  AUTH_PROVIDERS.some((p) => p.id === value);

export interface OAuthOptions {
  /** Absolute URL Supabase returns to with `?code=` (must be in Auth > URL Configuration > Redirect URLs). */
  redirectTo: string;
  /** In a browser supabase-js navigates to the provider unless this is true. Ignored on servers. */
  skipBrowserRedirect?: boolean;
}

export interface OAuthStart {
  provider: AuthProviderId;
  /** Provider authorize URL; redirect here yourself when not in a browser (server actions, desktop apps). */
  url: string;
}

type OAuthResult = { data: { url?: string | null } | null; error: Error | null };

function started(provider: AuthProviderId, result: OAuthResult): OAuthStart {
  if (result.error) throw result.error;
  if (!result.data?.url) throw new Error(`Supabase returned no authorize URL for ${provider}`);
  return { provider, url: result.data.url };
}

/** Starts sign-in with an OAuth provider. A verified email that matches an existing account joins that account automatically. */
export async function signInWithProvider(client: SupabaseClient, provider: AuthProviderId, options: OAuthOptions): Promise<OAuthStart> {
  return started(provider, await client.auth.signInWithOAuth({ provider, options }));
}

/** Links another provider to the signed-in user (needs "Allow manual linking" in Supabase Auth). Returns through `redirectTo` like sign-in. */
export async function linkProvider(client: SupabaseClient, provider: AuthProviderId, options: OAuthOptions): Promise<OAuthStart> {
  return started(provider, await client.auth.linkIdentity({ provider, options }));
}
