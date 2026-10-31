# CONTRACTS (master)

What platform exposes and what other repos expect. Update when an interface changes. Updated: 2026-10-31.

## Packages
| Package | Version | Status | Exposes |
|---|---|---|---|
| `@gokulsaraswat/ui` | - | planned (v0.1 next) | CSS-variable tokens, React footer + legal/SEO pages |
| `@gokulsaraswat/mdx` | - | planned | MDX component registry |
| `@gokulsaraswat/auth` | - | planned | Supabase client + role helpers |
| `@gokulsaraswat/config` | - | planned | types/schema for `config.json` and roles |

Registry: GitHub Packages (`https://npm.pkg.github.com`). Scope must match the GitHub owner, hence `@gokulsaraswat`.
Installing requires a token with `read:packages` (local `.npmrc` or CI secret `NODE_AUTH_TOKEN`), even for public packages.

## Cross-repo contracts
TO BE UPDATED: Supabase tables (`content`, `app_config`, `user_roles`, `role_permissions`), `config.json` schema,
MDX registry, roles/permissions, base paths. Decided names live in docs/WORKLOG.md "Decisions"; shapes are not defined yet.
