import { roles, ALL_APPS, type AppId, type Role, type UserRole } from '@gokulsaraswat/config';

const rank = (role: Role) => roles.length - roles.indexOf(role);

export const isSuperAdmin = (rows: readonly UserRole[]): boolean =>
  rows.some((r) => r.app === ALL_APPS && r.role === 'super_admin');

/** True if the user holds `min` or a higher role in `app`. A global super_admin passes every check. */
export const hasRole = (rows: readonly UserRole[], app: AppId, min: Role): boolean =>
  isSuperAdmin(rows) || rows.some((r) => r.app === app && rank(r.role) >= rank(min));
