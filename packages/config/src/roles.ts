import type { AppId } from './apps.js';

/** Highest first. super_admin is global; admin and member are per app. */
export const roles = ['super_admin', 'admin', 'member'] as const;

export type Role = (typeof roles)[number];

/** `user_roles.app` value for global grants (super_admin only). */
export const ALL_APPS = '*';

/** One row of the Supabase `user_roles` table. */
export type UserRole =
  | { user_id: string; app: typeof ALL_APPS; role: 'super_admin' }
  | { user_id: string; app: AppId; role: Exclude<Role, 'super_admin'> };
