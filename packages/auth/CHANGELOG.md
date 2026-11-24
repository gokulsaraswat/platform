# @gokulsaraswat/auth

## 0.2.0

### Minor Changes

- auth: shared sign-in for every app. `AUTH_PROVIDERS` (Google, GitHub), `isAuthProviderId`, `signInWithProvider`, `linkProvider`, `listIdentities`, `unlinkProvider` (throws `IdentityError` `last_identity` / `identity_not_found`), `requestAppAccess` (`request_access` RPC) and `ensureAppAccess` (member/admin/pending/denied/none). config: new app id `converter` (gokul-omni-converter), `AccessRequest` row type and `accessRequestStatuses`.

### Patch Changes

- Updated dependencies
  - @gokulsaraswat/config@0.2.0

## 0.1.0

### Minor Changes

- 4c4b260: config: app ids, roles, `UserRole` row type, hub `config.json` zod schema (`parseHubConfig`). auth: `hasRole`, `isSuperAdmin`, `getUserRoles` over Supabase `user_roles`.

### Patch Changes

- Updated dependencies [4c4b260]
  - @gokulsaraswat/config@0.1.0
