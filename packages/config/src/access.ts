import type { AppId } from './apps.js';

export const accessRequestStatuses = ['pending', 'approved', 'denied'] as const;

export type AccessRequestStatus = (typeof accessRequestStatuses)[number];

/** One row of the Supabase `access_requests` table (returned by the `request_access` RPC). */
export interface AccessRequest {
  id: string;
  user_id: string;
  app: AppId;
  email: string;
  name: string | null;
  status: AccessRequestStatus;
  requested_role: 'member' | 'admin';
  created_at: string;
  decided_at: string | null;
  decided_by: string | null;
}
