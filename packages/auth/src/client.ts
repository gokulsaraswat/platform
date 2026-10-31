import type { SupabaseClient } from '@supabase/supabase-js';
import type { UserRole } from '@gokulsaraswat/config';

/** Reads a user's rows from `user_roles`. Visibility is enforced by RLS on the table, not here. */
export async function getUserRoles(client: SupabaseClient, userId: string): Promise<UserRole[]> {
  const { data, error } = await client.from('user_roles').select('user_id, app, role').eq('user_id', userId);
  if (error) throw error;
  return (data ?? []) as UserRole[];
}
