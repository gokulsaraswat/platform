export { hasRole, isSuperAdmin } from './roles.js';
export { getUserRoles } from './client.js';
export {
  AUTH_PROVIDERS,
  isAuthProviderId,
  signInWithProvider,
  linkProvider,
  type AuthProviderId,
  type OAuthOptions,
  type OAuthStart,
} from './providers.js';
export { listIdentities, unlinkProvider, IdentityError, type LinkedIdentity, type IdentityErrorCode } from './identities.js';
export {
  requestAppAccess,
  ensureAppAccess,
  type AppAccess,
  type AppAccessStatus,
  type EnsureAppAccessOptions,
} from './access.js';
