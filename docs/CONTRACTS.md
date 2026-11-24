# CONTRACTS (master)

What platform exposes and what other repos expect. Update when an interface changes. Updated: 2026-11-25.

## Packages
| Package | Version | Status | Exposes |
|---|---|---|---|
| `@gokulsaraswat/ui` | 0.2.0 | published by Release workflow | `.` (React), `./tokens.css`, `./tailwind.css`, `./styles.css`; since 0.2.0 `./v2`, `./v2/tokens.css`, `./v2/components.css`, `./v2/tailwind.css` (see below) |
| `@gokulsaraswat/mdx` | - | planned | MDX component registry |
| `@gokulsaraswat/auth` | 0.2.0 | published by Release workflow | roles (`hasRole`, `isSuperAdmin`, `getUserRoles`); since 0.2.0 sign-in, identity linking and access requests (see below) |
| `@gokulsaraswat/config` | 0.2.0 | published by Release workflow | app ids, roles, `UserRole`, hub `config.json` schema; since 0.2.0 app id `converter`, `AccessRequest` |

Registry: GitHub Packages (`https://npm.pkg.github.com`). Scope must match the GitHub owner, hence `@gokulsaraswat`.
Installing requires a token with `read:packages`, even for public packages. Consumer `.npmrc`:
```
@gokulsaraswat:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```
Releases: `npx changeset` -> `npx changeset version` (bump + CHANGELOG) -> push to main -> `.github/workflows/release.yml` publishes versions not yet on the registry and pushes `<name>@<version>` tags. `install-smoke.yml` then installs the published version and renders it.
Other repos' CI: grant the repo read access under the package's "Manage Actions access" (then `GITHUB_TOKEN` works) or store a `read:packages` token as `NODE_AUTH_TOKEN`.

## `@gokulsaraswat/ui` tokens
Import `@gokulsaraswat/ui/tokens.css` (any framework). Tailwind v4 apps then import `@gokulsaraswat/ui/tailwind.css` after `@import "tailwindcss";`.
| Group | Variables | Notes |
|---|---|---|
| Color (light `:root`, dark `.dark`) | `--background`, `--foreground`, `--card(-foreground)`, `--popover(-foreground)`, `--primary(-foreground)`, `--secondary(-foreground)`, `--muted(-foreground)`, `--accent(-foreground)`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5`, `--sidebar`, `--sidebar-{foreground,primary,primary-foreground,accent,accent-foreground,border,ring}` | shadcn names, oklch, from bestportofolio. Tailwind: `bg-primary` etc. Per-app accent = override these after import. |
| Radius | `--radius` (0.625rem), `--radius-{sm,md,lg,xl}` | |
| Font | `--font-sans`, `--font-mono` | use app-provided `--font-geist-sans` / `--font-geist-mono` if set, else system stack |
| Type scale | `--text-{xs..9xl}`, `--text-*--line-height` | Tailwind v4.3.3 defaults |
| Shadow | `--shadow-{2xs,xs,sm,md,lg,xl,2xl,inner}` | Tailwind v4.3.3 defaults |
| Motion | `--motion-ease-enter`, `--motion-ease-exit`, `--motion-duration-{micro,spatial,morph}` (150/300/400ms; 0ms under reduced motion) | Tailwind: `ease-enter`, `ease-exit` |

Dark mode: class `dark` on an ancestor. Breaking change = renaming/removing any variable above.

## `@gokulsaraswat/ui` components
Peer: `react@^19`. Import `@gokulsaraswat/ui/styles.css` after `tokens.css`. Classes are `gk-` prefixed; no Tailwind needed. No hooks, so they render as React Server Components.
| Export | Signature | Notes |
|---|---|---|
| `Footer` | `{ siteName: string; tagline?: string; basePath?: string; columns?: { title; links: { label; href }[] }[]; socials?: { label; href; icon?: ReactNode }[]; linkComponent?: LinkComponent; year?: number }` | Always renders © line + the 9 `footerPages` links at `basePath + /slug`. Internal links use `linkComponent` (e.g. `next/link`); `http(s):`/`mailto:` use `<a>`. |
| `LegalPage` | `{ slug: FooterPageSlug; siteName: string; contactEmail?: string }` | Placeholder body marked `data-placeholder`; real text pending review. |
| `footerPages` | `readonly { slug; title }[]` | `privacy` Privacy Policy, `terms` Terms of Service, `cookies` Cookie Policy, `data-deletion` Data Deletion Request, `accessibility` Accessibility Statement, `sitemap` Sitemap, `faq` FAQ, `about` About, `contact` Contact |
| `pagePath(basePath, slug)` | `string` | `('/gspace','faq')` -> `/gspace/faq` |
| `LinkComponent`, `LinkProps` | `ComponentType<{ href; className?; children }>` | |

Apps must serve a route for each `footerPages` slug under their base path (own page or `LegalPage`).

## `@gokulsaraswat/ui/v2` (design system v2; additive, since ui 0.2.0)
Adopt: bump to `@gokulsaraswat/ui@^0.2.0` only when a repo starts its v2 redesign; v1 users need no change.
Full brief with every value: `docs/DESIGN-BRIEF.md`. Source: `packages/ui/src/v2/flavors.json` (generated outputs, never edit them).
| Export | Shape | Notes |
|---|---|---|
| `./v2/tokens.css` | `--gk-*` variables; `data-gk-flavor="instrument\|atelier\|margin"`; dark via `.dark` or `data-gk-theme="dark"`; `data-gk-theme="system"` | v1 variable names untouched; no `--gk-*` existed before |
| `./v2/components.css` | `gk-` classes: app, btn, field/input/select/textarea, check, switch, card, badge, alert, table, tabs, topbar/sidenav/navlink, dialog, toast, skeleton, spinner, state, kbd, mark | v1 `gk-footer*` / `gk-legal*` untouched |
| `./v2/tailwind.css` | Tailwind v4 `@theme inline`: `--color-gk-*`, `--font-gk-*`, `--text-gk-*`, `--radius-gk-*`, `--shadow-gk-{1,2,3}`, `--ease-gk-*` | namespaced, no clash with v1 utilities |
| `./v2` (React, peer react@^19) | `Button`, `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Card`, `Badge`, `Alert`, `Skeleton`, `Spinner`, `Kbd`, `Dialog`, `ToastRegion`, `Tabs`, `tabPanelProps`, `EmptyState`, `ErrorState`, `cx`, `flavors`, `flavorNames`, types | `Dialog`, `ToastRegion`, `Tabs` ship with `'use client'`; everything else (incl. `Field`, `tabPanelProps`, states) works in server components |
Breaking change = renaming/removing a `--gk-*` variable, a `gk-` class or a v2 export. Adding is minor.

All packages are ESM-only (`import`; no `require`). Verified for TS `moduleResolution` `nodenext` and `bundler` (Next/Vite).

## `@gokulsaraswat/config`
| Export | Value / shape |
|---|---|
| `appIds`, `AppId` | `hub`, `admin`, `portfolio`, `gspace`, `studio`, `gym`, `converter` (since 0.2.0). Repo -> id: gokulmobilize `hub`, admin `admin`, bestportofolio `portfolio`, GSpace `gspace`, Markdown-studio `studio`, checkers-gym-management `gym`, gokul-omni-converter `converter` |
| `accessRequestStatuses`, `AccessRequestStatus`, `AccessRequest` (0.2.0) | `pending` \| `approved` \| `denied`; `AccessRequest` = one `access_requests` row (columns below, timestamps as ISO strings) |
| `roles`, `Role` | `super_admin` > `admin` > `member` |
| `ALL_APPS` | `'*'` (global grant; only with `super_admin`) |
| `UserRole` | `{ user_id: string; app: '*'; role: 'super_admin' } \| { user_id: string; app: AppId; role: 'admin' \| 'member' }` |
| `hubConfigSchema`, `parseHubConfig(input)`, `HubConfig`, `HubTile`, `tileModes` | `{ version: 1; apps: { id: AppId; name: string; href: string; mode: 'bundled' \| 'remote' \| 'external'; enabled: boolean }[] }`. `external` href = `https://` URL; others = path starting `/`; ids unique. `parseHubConfig` throws `ZodError`. |

## `@gokulsaraswat/auth`
Peer: `@supabase/supabase-js@^2`. Apps create their own client (`createClient` or `@supabase/ssr`) and pass it in.
| Export | Signature | Notes |
|---|---|---|
| `getUserRoles` | `(client: SupabaseClient, userId: string) => Promise<UserRole[]>` | `select user_id, app, role from user_roles where user_id = $1`; throws the Supabase error |
| `hasRole` | `(rows: readonly UserRole[], app: AppId, min: Role) => boolean` | true if global super_admin, or a row for `app` with role >= `min` |
| `isSuperAdmin` | `(rows: readonly UserRole[]) => boolean` | row `app = '*'`, `role = 'super_admin'` |
| `AUTH_PROVIDERS` (0.2.0) | `readonly [{ id: 'google'; label: 'Google' }, { id: 'github'; label: 'GitHub' }]` | button order; `AuthProviderId = 'google' \| 'github'` |
| `isAuthProviderId` | `(value: unknown) => value is AuthProviderId` | validate form/query input |
| `signInWithProvider` | `(client, provider: AuthProviderId, options: OAuthOptions) => Promise<OAuthStart>` | `auth.signInWithOAuth({ provider, options })`. `OAuthOptions = { redirectTo: string; skipBrowserRedirect?: boolean }`, `OAuthStart = { provider; url }`. In a browser supabase-js navigates to `url` itself (unless `skipBrowserRedirect`); on a server, redirect to `url`. Throws the Supabase error, or `Error` if no URL |
| `linkProvider` | `(client, provider: AuthProviderId, options: OAuthOptions) => Promise<OAuthStart>` | `auth.linkIdentity(...)`; user must be signed in; same redirect handling as sign-in |
| `listIdentities` | `(client) => Promise<LinkedIdentity[]>` | `auth.getUserIdentities()`, oldest first. `LinkedIdentity = { provider: string; identityId: string; email: string \| null; createdAt: string \| null; raw: UserIdentity }` (`provider` may also be `email`) |
| `unlinkProvider` | `(client, identity: { identityId: string }) => Promise<void>` | re-reads identities, then `auth.unlinkIdentity(raw)`. Throws `IdentityError` (`code: 'last_identity' \| 'identity_not_found'`) before any request; otherwise the Supabase error |
| `IdentityError` | `class extends Error { code: IdentityErrorCode }` | `instanceof` check in the UI |
| `requestAppAccess` | `(client, app: AppId) => Promise<AccessRequest>` | `rpc('request_access', { p_app: app })`; idempotent; throws the Supabase error (`42501`, `22023`) |
| `ensureAppAccess` | `(client, userId: string, app: AppId, options?: { fileRequest?: boolean }) => Promise<AppAccess>` | `AppAccess = { status: 'admin' \| 'member' \| 'pending' \| 'denied' \| 'none'; roles: UserRole[]; request: AccessRequest \| null }`. `getUserRoles` + `hasRole`: admin (incl. super admin) or member -> `request: null`, nothing filed. Otherwise files via `request_access` (default) or only reads `access_requests` (`fileRequest: false`). Status from the request: `pending`, `denied`; `approved` without a role (removed since) or no row -> `none` |
Client-side checks only shape the UI; RLS on every table is the real enforcement.

## Shared sign-in (every app; since auth 0.2.0)
One Supabase project (the one admin uses) for every app. Same sign-in everywhere; JS apps use `@gokulsaraswat/auth`, others (Markdown-studio static, gokul-omni-converter Python) mirror this section.
- **Providers:** Google, then GitHub (`AUTH_PROVIDERS`), via Supabase Auth OAuth. Buttons read "Continue with Google" / "Continue with GitHub". Email/password stays only where it already exists (admin).
- **Automatic linking:** Supabase joins a new OAuth identity to an existing user when the provider's verified email matches. Nothing to code.
- **Manual linking ("Connected accounts" screen, signed-in users):** list identities (provider, email, linked date); "Link Google" / "Link GitHub" for providers not yet linked (`linkProvider`); "Unlink" with a confirm step, disabled when only one identity is left (`unlinkProvider` refuses it too, and Supabase answers `single_identity_not_deletable`). If the provider account already belongs to another user, Supabase returns to the redirect URL with `?error=...&error_code=identity_already_exists&error_description=...`; show that message.
- **Guests:** every app is usable without signing in (what guests see is the app's choice).
- **Access:** a signed-in user with no `user_roles` row for the app gets an `access_requests` row (`ensureAppAccess` / `request_access(p_app)`), sees "Waiting for approval" (`pending`) or "No access" (`denied`), and keeps guest features. App admins approve members; only the super admin grants `admin` (admin app `/access-requests`). After approval, re-read roles (no new sign-in needed; roles are not in the JWT).
- **Callback:** server apps expose `GET /auth/callback?code=<pkce code>&next=<relative path>`: `exchangeCodeForSession(code)`, then redirect to `next` (must start with `/`, not `//`). Sign-in and linking share it (linking uses `next=/account` or the app's equivalent). Browser-only apps (supabase-js `createClient`, implicit flow) redirect back to the page itself; supabase-js reads the session from the URL.

REST equivalents (no supabase-js, e.g. Python), all with header `apikey: <anon key>`:
| Step | Request |
|---|---|
| Sign in | open `GET {SUPABASE_URL}/auth/v1/authorize?provider=google\|github&redirect_to=<url>&code_challenge=<S256 of verifier>&code_challenge_method=s256`; the redirect brings `?code=`; then `POST /auth/v1/token?grant_type=pkce` body `{ "auth_code": "<code>", "code_verifier": "<verifier>" }` -> session |
| List identities | `GET /auth/v1/user` (Bearer access token) -> `identities[]` (`identity_id`, `provider`, `identity_data.email`, `created_at`) |
| Link | `GET /auth/v1/user/identities/authorize?provider=github&redirect_to=<url>&skip_http_redirect=true` (Bearer; add the PKCE params as above) -> `{ "url" }`; open it; finish with the same `grant_type=pkce` exchange |
| Unlink | `DELETE /auth/v1/user/identities/<identity_id>` (Bearer); check there are 2+ identities first |
| Request access | `POST {SUPABASE_URL}/rest/v1/rpc/request_access` (Bearer) body `{ "p_app": "converter" }` -> the row |
| Read roles | `GET /rest/v1/user_roles?select=user_id,app,role&user_id=eq.<uid>` (Bearer) |

Redirect URLs (Supabase Auth > URL Configuration > Redirect URLs; anything not listed falls back to the Site URL):
| App (id) | Local | Production |
|---|---|---|
| admin (`admin`) | `http://localhost:3001/auth/callback` | `https://<admin domain>/auth/callback` (with basePath `/admin` later: `https://<domain>/admin/auth/callback`) |
| bestportofolio (`portfolio`) | `http://localhost:3000/auth/callback` | `https://bestportofolio.vercel.app/auth/callback`, later `https://<domain>/auth/callback` |
| GSpace (`gspace`) | `http://localhost:4321/**` | `https://<domain>/gspace/**` (returns to the current page) |
| gokulmobilize (`hub`) | `http://localhost:4321/apps/**` | `https://<domain>/apps/**`; Android: `com.gokulsaraswat.gokulmobilize://auth/callback` (app deep link) |
| Markdown-studio (`studio`) | its local static server origin + `/**` | `https://gokulsaraswat.github.io/Markdown-studio/**`, later `https://<domain>/studio/**` |
| gokul-omni-converter (`converter`) | loopback `http://127.0.0.1:<fixed port>/auth/callback` (port chosen in that repo, recorded here) | same (desktop app) |

Manual Supabase steps (Gokul, dashboard only):
1. GitHub: github.com > Settings > Developer settings > OAuth Apps > New OAuth App. Homepage = the main site URL; Authorization callback URL = `https://<project-ref>.supabase.co/auth/v1/callback`. Copy Client ID, generate a Client secret.
2. Supabase > Authentication > Sign In / Providers > GitHub: enable, paste Client ID + secret, save. Google: already enabled (confirm).
3. Supabase > Authentication > Sign In / Providers (Auth settings): enable "Allow manual linking" (needed by `linkIdentity`; without it linking fails with `manual_linking_disabled`).
4. Supabase > Authentication > URL Configuration: add every Redirect URL above that exists yet; keep Site URL = the main site.
5. Apply admin migrations in order (`20261125120000_access_requests.sql`, `20261125130000_app_members.sql`, `20261125140000_app_converter.sql`) and run their tests in `admin/supabase/tests/`.

## Cross-repo contracts
### Supabase `user_roles` (owner: admin repo creates the migration + RLS)
| Column | Type | Rule |
|---|---|---|
| `user_id` | `uuid` | references `auth.users(id)` on delete cascade |
| `app` | `text` | one of `appIds` or `'*'` |
| `role` | `text` | one of `roles`; `super_admin` iff `app = '*'` |
Primary key `(user_id, app)`. Finer permissions (`role_permissions`) only when needed (Ideas.md).

### Supabase `access_requests` (owner: admin repo, `supabase/migrations/20261125120000_access_requests.sql`; NOT APPLIED yet)
Invite-only access for every app. A signed-in user with no `user_roles` row for an app calls `request_access(app)` (e.g. GSpace from the browser with the anon key) and waits; that app's admins approve or deny. Only a super admin can grant `admin` (e.g. make someone admin of gspace, done in the admin app at `/access-requests`).
| Column | Type | Rule |
|---|---|---|
| `id` | `uuid` | primary key, default `gen_random_uuid()` |
| `user_id` | `uuid` | not null, references `auth.users(id)` on delete cascade |
| `app` | `text` | not null, one of `appIds` (`converter` allowed once admin `20261125140000_app_converter.sql` is applied; it also widens `user_roles.app`, `permissions.app` and `request_access`) |
| `email` | `text` | not null, copied from `auth.users.email` |
| `name` | `text` | null; `raw_user_meta_data->>'full_name'`, else `->>'name'` |
| `status` | `text` | `pending` (default), `approved`, `denied` |
| `requested_role` | `text` | `member` (default) or `admin`; `request_access` always writes `member` |
| `created_at` | `timestamptz` | not null, default `now()` |
| `decided_at` | `timestamptz` | null until decided |
| `decided_by` | `uuid` | null; references `auth.users(id)` on delete set null |
Unique `(user_id, app)`: one request per user per app.
RLS: SELECT own rows (`user_id = auth.uid()`) or `has_app_role(app, 'admin')` (super admin sees all). No INSERT/UPDATE/DELETE for clients; only `select` is granted to `authenticated`, nothing to `anon`. All writes go through the two RPCs.

RPCs (both `security definer`, `search_path = ''`, execute granted to `authenticated` only):
| Signature | Behaviour | Errors (Postgres code) |
|---|---|---|
| `request_access(p_app text) returns access_requests` | Inserts a `pending` `member` request for `auth.uid()` with email/name from `auth.users`. If a row for (user, app) exists it is returned unchanged (a `denied` or `approved` status is never reset). | `42501` not signed in; `22023` unknown app |
| `decide_access_request(p_id uuid, p_approve boolean, p_role text default 'member') returns access_requests` | Caller must be admin of the request's app (`has_app_role(app, 'admin')`); `p_role = 'admin'` also needs `is_super_admin()`. Approve: upserts `user_roles(user_id, app, role)` (on conflict update role) and sets `approved`. Deny: sets `denied` (rejected once approved; remove the role instead). Sets `decided_at = now()`, `decided_by = auth.uid()`. App admins cannot change a user who is already admin. | `P0002` request not found or not your app; `42501` not signed in / admin grant without super admin / changing an admin; `22023` bad role, null approve, or deny after approve |
Client call (supabase-js): `supabase.rpc('request_access', { p_app: 'gspace' })` -> the row; check `status` (`pending` = show "waiting for approval"). Read own state without writing: `from('access_requests').select('status').eq('app', 'gspace').maybeSingle()`. After approval the user has a `user_roles` row; refresh the session/roles. Test: admin `supabase/tests/access_requests_test.sql` (rolls back).

Members of an app (admin `supabase/migrations/20261125130000_app_members.sql`; NOT APPLIED yet):
| Signature | Behaviour | Errors (Postgres code) |
|---|---|---|
| `list_app_members(p_app text) returns table (user_id uuid, role text, email text, name text, created_at timestamptz)` | `security definer`, `stable`, `search_path = ''`, execute granted to `authenticated` only. Caller must pass `has_app_role(p_app, 'admin')`. Returns every `user_roles` row with `app = p_app`, plus each super admin (`role = 'super_admin'`, `created_at` of the `*` row) who has no row in that app; a super admin with a row in the app is listed once, with that row's role. `email` from `auth.users.email` (`''` if null); `name` = `raw_user_meta_data->>'full_name'`, else `->>'name'`, else null. Ordered super_admin, admin, member, then email. | `42501` not signed in or not an admin of `p_app` |
Remove a member = delete their `user_roles` row from the client, no RPC: `supabase.from('user_roles').delete().eq('user_id', id).eq('app', 'gspace')`. RLS allows an app admin to delete only `member` rows of their app and a super admin any row; other rows are silently skipped (0 rows deleted), and the last super admin cannot be removed (trigger). Their `user_permissions` rows cascade; their `access_requests` row stays `approved`, so a later `request_access` returns it unchanged (re-add them with a `user_roles` insert, not a new request). Test: admin `supabase/tests/app_members_test.sql` (rolls back).

### Portfolio data (NEW Supabase project): DRAFT v1, 2026-11-25
Status: draft v1, NOTHING APPLIED. Owner of the SQL: admin repo, `admin/supabase/migrations/<timestamp>_portfolio_*.sql` + rollback tests in `admin/supabase/tests/portfolio_*_test.sql`; Gokul applies them. Consumers: admin portfolio section (all writes), bestportofolio Astro rebuild (public reads + public endpoints), migration script OLD (Prisma, 13 models) -> NEW (admin repo, Gokul runs it). Backlog: PLT-F-004. Sources: `bestportofolio/prisma/schema.prisma`, `bestportofolio/supabase/migrations/001_rag_schema.sql`, workspace plan decisions 1-20, admin `docs/PORTFOLIO-ADMIN-SPEC.md` section 7 answers. Renaming anything below after it is applied = breaking.

#### P1. Conventions
- Schema `public`. Portfolio-only tables are prefixed `portfolio_`; shared tables carry an `app` column like `user_roles`: `todos`, `todo_history`, `audit_log`, `documents`. No clash with admin's `user_roles`, `permissions`, `user_permissions`, `access_requests`.
- Standard columns ("std") on content tables: `id uuid primary key default gen_random_uuid()`, `created_at timestamptz not null default now()`, `updated_at timestamptz not null default now()` (trigger `public.set_updated_at()`), `legacy_id text unique` (old cuid; null for new rows; makes the migration idempotent).
- Old JSON-in-string columns become `jsonb` or `text[]`; comma-separated tags become `tags text[] not null default '{}'` (trimmed, de-duplicated, empty dropped; GIN index). Newline-separated `embeds` become `embeds text[]`.
- Visibility of posts, projects, courses, snippets: `status text not null default 'draft' check (status in ('draft','review','published'))` + `published_at timestamptz`. Public = `status = 'published' and published_at <= now()`. Scheduled = `published` with a future `published_at`: no public GET writes anything any more.
- Long text: `body text not null default ''` + `body_format text not null default 'md' check (body_format in ('md','mdx'))` (decision 7; MDX compiled with the component allow-list of `@gokulsaraswat/mdx`, never arbitrary imports/JS).
- Per-page SEO (decision 17): `seo jsonb not null default '{}'`, shape `{ title?: string, description?: string, og_image?: string }`.
- Slugs: `unique`, check `slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`; auto from title while draft, locked after first publish (admin form, answer 8).
- Text columns listed without a type are `text not null default ''`; `slug` is `text not null unique`; `position int not null default 0`; `enabled boolean not null default true`.
- Reserved words avoided: `position int not null default 0` (not `order`), `is_primary`, `group_name`.
- Every table: RLS on, grants explicit (project setting "auto-expose new tables" is OFF). Helpers reused from admin `20261031120000_roles_permissions.sql`: `has_app_role(app, min)`, `has_permission(app, key)`, `is_super_admin()`. App id `portfolio`.
- Write rule notation `W(area)` = `has_permission('portfolio', '<area>.edit')`, using the seeded catalog keys (`posts`, `projects`, `courses`, `snippets`, `comments`, `messages`, `settings`, `chatbot`, `backup`). It is true for portfolio admins and super admin, and for a member only if a portfolio admin granted that key (delegated admin, answer 1). With no grants it is exactly "portfolio admins or super_admin". `R(area)` = `has_permission('portfolio', '<area>.view')`.
- Publishing posts / snippets (status or `published_at` change) additionally needs `posts.publish` / `snippets.publish`: BEFORE UPDATE/INSERT trigger raises `42501` otherwise. Projects and courses publish with `.edit` (no publish key exists).
- `like_count` columns: `authenticated` gets column-level UPDATE on every other column, never on `like_count`; only `portfolio_toggle_like` changes it.
- Anon reads use column-level SELECT grants where a table holds private columns (comments, snippets); clients must name columns (`select('*')` fails for anon there).

#### P2. Tables (portfolio_)
| Table | Columns (beyond std unless noted) | Anon SELECT | Authenticated |
|---|---|---|---|
| `portfolio_profile` | single row: `id smallint primary key default 1 check (id = 1)`, `name text not null`, `short_name`, `headline` (old occupation), `company`, `tagline`, `bio` (md), `location`, `email_public`, `avatar_url`, `resume_url` (all `text not null default ''`), `socials jsonb not null default '{}'` (keys `github`, `linkedin`, `twitter`, `youtube`, `spotify`, `website`, `codechef`, `leetcode`; https URLs, empty keys omitted), `certifications text[] not null default '{}'`, `extra jsonb not null default '{}'` (kept, not rendered: `code_review_philosophy`, `agile_experience`), `updated_at`, `legacy_id`. No phone column. | all columns | select all; update `W(settings)`; no insert/delete (row created by migration) |
| `portfolio_settings` | `key text primary key check (key ~ '^[a-z_]+(\.[a-z_]+)*$')`, `value jsonb not null`, `is_public boolean not null default true`, `description text not null default ''`, `updated_at`, `updated_by uuid default auth.uid()`. Keys: see P7. | `is_public` rows | select public rows or `R(settings)`; insert/update/delete `W(settings)` |
| `portfolio_hero_lines` | `text text not null check (char_length(text) between 1 and 80)`, `position`, `enabled boolean not null default true` | `enabled` | select; write `W(settings)` |
| `portfolio_stats` | `value numeric not null`, `prefix text not null default ''`, `suffix text not null default ''`, `label text not null`, `icon text` (icon name, null = none), `description text`, `position`, `enabled` (decision 11) | `enabled` | select; write `W(settings)` |
| `portfolio_skill_categories` | `name text not null unique`, `position`, `enabled` | `enabled` | select; write `W(settings)` |
| `portfolio_skills` | `category_id uuid not null references portfolio_skill_categories on delete cascade`, `name text not null`, `icon_slug text check (icon_slug ~ '^[a-z0-9]+$')` (Simple Icons, null = none), `is_primary boolean not null default false`, `position`, `enabled`; unique `(category_id, name)` (decision 12, no % bars) | `enabled` and category enabled | select; write `W(settings)` |
| `portfolio_gallery` | `image_url text not null`, `alt text not null default ''` (admin warns when empty; site renders empty alt as decorative), `caption text`, `position`, `enabled` (old carousel -> About gallery, decision 13) | `enabled` | select; write `W(settings)` |
| `portfolio_chat_starters` | `text text not null check (char_length(text) between 1 and 120)`, `position`, `enabled` (decision 10) | `enabled` | select; write `W(chatbot)` |
| `portfolio_tracks` | `title text not null`, `artist text not null default ''`, `audio_url text not null` (https or `portfolio-audio` public URL), `storage_path text` (object path when uploaded), `duration_seconds int`, `position`, `enabled` (decision 9) | `enabled` | select; write `W(settings)` |
| `portfolio_footer_links` | `group_name text not null check (group_name in ('work','writing','about','elsewhere'))`, `label text not null`, `href text not null` (path starting `/`, `https://` or `mailto:`), `external boolean not null default false`, `position`, `enabled` (decision 15). The bottom legal row is NOT stored: it is `footerPages` + RSS. | `enabled` | select; write `W(settings)` |
| `portfolio_posts` | `title text not null`, `slug`, `excerpt`, `body`, `body_format`, `cover_image_url`, `tags`, `type text not null default 'article' check (type in ('article','youtube','spotify','tweet'))`, `embed_url`, `embeds`, `behind_the_scenes`, `category`, `written_by`, `accepted_by` (text, default ''), `resource_links jsonb not null default '[]'` (`[{ label, url, description }]`), `status`, `published_at`, `seo`, `like_count int not null default 0`, `created_by uuid default auth.uid()` | public rows (P1) | select public or `R(posts)`; write `W(posts)` (+ publish rule) |
| `portfolio_post_ideas` | `title text not null`, `description`, `tags`, `status text not null default 'idea' check (status in ('idea','drafting','review','published'))`, `priority text not null default 'medium' check (priority in ('low','medium','high'))`, `source`, `notes`, `post_id uuid references portfolio_posts on delete set null` (idea and post linked, answer 9) | none | select `R(posts)`; write `W(posts)` |
| `portfolio_projects` | `title text not null`, `slug`, `short_desc`, `description text not null` (md), `body_format`, `banner_url`, `website_url`, `download_url`, `repository_url`, `video_url`, `stack text[]`, `screenshots text[]`, `role`, `process`, `results`, `behind_the_scenes`, `architecture_diagrams jsonb not null default '[]'` (`[{ title, url, description, type: hld\|lld\|dfd\|sequence\|erd\|other }]`), `db_schema_url`, `adr_content`, `cicd_snippet`, `iac_snippet`, `observability_url`, `test_coverage_url`, `performance_metrics`, `security_implementation`, `swagger_url`, `terminal_session_url`, `contributors jsonb not null default '[]'` (`[{ name, role, avatar?, url?, hidden? }]`; site skips `hidden`), `show_team boolean`, `embeds`, `featured boolean`, `complexity smallint not null default 1 check (complexity between 1 and 3)`, `status`, `published_at`, `seo`, `like_count` | public rows | select public or `R(projects)`; write `W(projects)` |
| `portfolio_courses` | `title text not null`, `slug`, `description`, `banner_url`, `embeds`, `status`, `published_at`, `seo`, `position` | public rows | select public or `R(courses)`; write `W(courses)` |
| `portfolio_course_chapters` | `course_id uuid not null references portfolio_courses on delete cascade`, `parent_id uuid references portfolio_course_chapters on delete cascade` (tree), `title text not null`, `slug`, `body`, `body_format`, `position`, `section_name`, `chapter_type text not null default 'content' check (chapter_type in ('content','hld','lld','api-design','code'))`, `linked_post_id uuid references portfolio_posts on delete set null`, `linked_snippet_id uuid references portfolio_snippets on delete set null`, `title_override`; unique `(course_id, slug)` | rows whose course is public (a linked post/snippet shows only if itself public: RLS on the join) | select; write `W(courses)` |
| `portfolio_snippets` | `title text not null`, `slug`, `description`, `type text not null default 'code'` (free text: code, hld, lld, api-design, db-design or custom), `language`, `tags`, `category`, `body`, `tabs jsonb not null default '[]'` (`[{ name, language, content }]`), `internal_notes text not null default ''` (PRIVATE), `demo_type text check (demo_type in ('image','link','output'))` (null = none), `demo_url`, `demo_output`, `include_in_rag boolean not null default false`, `embeds`, `status`, `published_at`, `seo` | public rows; column grant excludes `internal_notes` | select public or `R(snippets)`; write `W(snippets)` (+ publish rule) |
| `portfolio_messages` | `id uuid`, `name text not null`, `email text not null`, `subject text not null default ''`, `body text not null`, `read boolean not null default false`, `replied boolean not null default false`, `replied_at timestamptz`, `reply_note text not null default ''`, `created_at`, `legacy_id`. Never auto-deleted (answer 4). | none | select `R(messages)`; update/delete `W(messages)`; no client insert (RPC only) |
| `portfolio_comments` | `id uuid`, `entity_type text not null check (entity_type in ('post','project','course','snippet'))`, `entity_id uuid not null`, `parent_id uuid references portfolio_comments on delete cascade`, `name text not null check (char_length(name) between 1 and 80)`, `email text check (char_length(email) <= 160)` (PRIVATE), `body text not null check (char_length(body) between 2 and 4000)`, `status text not null default 'pending' check (status in ('pending','approved','rejected'))`, `is_author boolean not null default false`, `author_id uuid references auth.users on delete set null`, `like_count int not null default 0`, `visitor_hash text` (PRIVATE), `moderated_by uuid`, `moderated_at timestamptz`, `created_at`, `updated_at`, `legacy_id`. Guard trigger: a reply's parent must be top level (`parent_id is null`, one level only), `approved`, same entity; `is_author = true` only with `author_id = auth.uid()` and `W(comments)`. Deleting a comment deletes its replies (FK) and its reactions (trigger; polymorphic, no FK). | `status = 'approved'` and target public (`portfolio_entity_is_public`); column grant: `id, entity_type, entity_id, parent_id, name, body, is_author, like_count, created_at` | select `R(comments)`; insert (author replies), update (`status`, `body`, `moderated_*`), delete: `W(comments)` |
| `portfolio_reactions` | `id bigint generated always as identity primary key`, `entity_type text not null check (entity_type in ('comment','post','project'))`, `entity_id uuid not null`, `kind text not null default 'like' check (kind = 'like')`, `visitor_hash text not null check (visitor_hash ~ '^[0-9a-f]{64}$')`, `created_at`; unique `(entity_type, entity_id, kind, visitor_hash)` (one like per visitor) | none (counts are the `like_count` columns) | select `has_app_role('portfolio','admin')`; no client writes (RPC only) |
| `portfolio_chat_usage` | `day date primary key`, `messages int not null default 0`, `errors int not null default 0`. No prompt text, no IP (decision 10: anonymous counts only). | none | select `W(chatbot)`; RPC only writes |

Shared tables (same project, `app` column; owner: admin repo):
| Table | Columns | RLS (all writes need a signed-in user unless noted) |
|---|---|---|
| `todos` | std + `app text not null default 'portfolio' check (app in ('*','hub','admin','portfolio','gspace','studio','gym'))`, `title text not null`, `description`, `status text not null default 'draft' check (status in ('draft','in-progress','review','done'))`, `priority text not null default 'medium' check (priority in ('low','medium','high'))`, `entity_type text not null default 'general'`, `entity_id text not null default ''`, `assignee text not null default ''`, `remarks`, `due_date date`, `completed_at timestamptz`, `archived boolean not null default false`, `created_by uuid default auth.uid()`. One platform board (answer 5). | select/insert/update/delete `has_app_role(app, 'admin')` (`'*'` rows: super admin only). No anon. |
| `todo_history` | `id bigint identity`, `todo_id uuid not null references todos on delete cascade`, `action text not null`, `field`, `old_value`, `new_value` (text, default ''), `actor_id uuid default auth.uid()`, `actor_label text not null default ''`, `created_at`, `legacy_id` | select if the todo is visible; rows written by an AFTER INSERT/UPDATE trigger on `todos` (security definer, field diffs); no client insert |
| `audit_log` | `id bigint identity`, `app text not null` (app ids or `'*'`), `actor_id uuid references auth.users on delete set null`, `actor_label text not null default ''` (email at the time, or legacy actor), `action text not null` (`<entity>.<verb>`, e.g. `post.update`), `entity_type text not null default ''`, `entity_id text not null default ''`, `details jsonb not null default '{}'`, `created_at`. Retention 90 days (answer 3). | select `has_app_role(app, 'admin')`; no client insert/update/delete: writes via `log_audit` RPC (stamps `auth.uid()` and email) or service role; purge via `purge_audit_log()` |
| `documents` | as old `001_rag_schema.sql` + `app`: `id uuid`, `app text not null default 'portfolio'`, `content text not null`, `type text not null check (type in ('resume','blog','project','course','profile','general','snippet'))` (`snippet` added: `scripts/rag-ingest.mjs` already writes it), `source_id text not null default ''`, `source_title text not null default ''`, `metadata jsonb not null default '{}'`, `embedding extensions.vector(768)`, `created_at`. HNSW cosine index (m 16, ef_construction 64), index `(app, type, source_id)`. Extension: `create extension if not exists vector with schema extensions`. | anon none; select/insert/delete `has_permission(app, 'chatbot.edit')` (admin index status + ingest after the server computes the embedding); chat search via `match_documents` (service role) |

Dropped tables: `AdminUser` (Supabase Auth + `user_roles`), `OperationLog` (-> `audit_log`), old `chat_logs` (no code writes it; decision 10).

#### P3. RPCs and functions
All `security definer`, `set search_path = ''`, fully qualified names, unless noted. "service_role only" = execute revoked from `public`, `anon`, `authenticated`; granted to `service_role`.
| Signature | Who | Behaviour | Errors |
|---|---|---|---|
| `portfolio_submit_comment(p_entity_type text, p_entity_id uuid, p_parent_id uuid, p_name text, p_email text, p_body text, p_visitor_hash text) returns table (id uuid, status text)` | service_role only | Validates lengths (name 1-80 trimmed, email null or <= 160 and email-shaped, body 2-4000), target public, parent rules (P2). `status` = `approved` when setting `comments.moderation` = `"auto"`, else `pending`. `is_author` always false. | `22023` invalid input; `P0002` target or parent not found / not public |
| `portfolio_toggle_like(p_entity_type text, p_entity_id uuid, p_visitor_hash text) returns table (liked boolean, like_count int)` | service_role only | Inserts or deletes the visitor's like and updates the target's `like_count` in the same transaction. Target must be public (approved comment, public post/project). | `22023`; `P0002` |
| `portfolio_submit_message(p_name text, p_email text, p_subject text, p_body text) returns uuid` | service_role only | Validates (name 1-120, email-shaped <= 160, subject <= 200, body 1-5000), inserts into `portfolio_messages`. | `22023` |
| `portfolio_record_chat(p_error boolean default false) returns void` | service_role only | Upserts today's `portfolio_chat_usage` row, +1 messages (or errors). | |
| `portfolio_entity_is_public(p_entity_type text, p_entity_id uuid) returns boolean` | anon, authenticated, `stable` | True if the post/project/course/snippet (or approved comment) is public. Used by policies and the RPCs above. | |
| `portfolio_promote_idea(p_idea uuid) returns portfolio_posts` | authenticated, `security invoker` (RLS applies: `W(posts)`) | One transaction: draft post `{title, excerpt = description, tags}`, idea `post_id` set, idea status `drafting`. | `P0002` not found |
| `log_audit(p_app text, p_action text, p_entity_type text default '', p_entity_id text default '', p_details jsonb default '{}') returns bigint` | authenticated | Caller needs `has_app_role(p_app, 'member')`; writes `actor_id = auth.uid()`, `actor_label` = their email. | `42501` |
| `purge_audit_log() returns int` | service_role only (pg_cron daily if enabled, else an admin cron) | Deletes `audit_log` rows older than 90 days, returns count. | |
| `match_documents(query_embedding extensions.vector(768), match_threshold float default 0.7, match_count int default 5, filter_type text default null, filter_app text default 'portfolio') returns table (id uuid, content text, type text, source_id text, source_title text, metadata jsonb, similarity float)` | service_role only; `language sql stable`, `security invoker` | Same as the old function (cosine, `embedding is not null`, `similarity > match_threshold`, order by distance, limit), plus `app = filter_app`. Today's call body `{ query_embedding, match_threshold, match_count, filter_type }` works unchanged. | |
| `set_updated_at()` | trigger only, `security invoker` | `new.updated_at = now()` | |

Why comments, likes and contact go through server endpoints + service_role-only RPCs, not anon RPCs: (1) `visitor_hash` = HMAC-SHA256(server secret, IP + user agent) must be made on the server, or any client could mint hashes and inflate likes; (2) rate limits need the request IP, which Postgres does not see reliably behind PostgREST; (3) honeypot + spam heuristics (today: > 3 links, keyword list, 25+ repeated characters -> 422) and notification email stay server-side; (4) the RPCs still validate and update counters atomically, so an endpoint bug cannot set `is_author`, skip moderation or corrupt `like_count`. Raw IPs are never stored.

#### P4. Storage buckets
| Bucket | Public | Limit | MIME | Layout | Write (authenticated; upsert needs select + insert + update) |
|---|---|---|---|---|---|
| `portfolio-media` | yes | 10 MB | `image/png`, `image/jpeg`, `image/webp`, `image/avif`, `image/gif`, `application/pdf` (resume). No SVG (script risk). | `<area>/<yyyy>/<uuid>-<name>`, `<area>` in `posts`, `projects`, `courses`, `snippets`, `settings` | `has_permission('portfolio', (storage.foldername(name))[1] \|\| '.edit')` and folder in that list |
| `portfolio-audio` | yes | 25 MB | `audio/mpeg`, `audio/mp4`, `audio/aac`, `audio/ogg`, `audio/webm` | `tracks/<uuid>-<name>` | `W(settings)` |
Reading: public object URLs. No anon SELECT policy (a policy would allow listing), same pattern as `public-config`. Only tracks Gokul has the rights to publish.

#### P5. Who reads and writes how
| Caller | Key | Access |
|---|---|---|
| Astro pages (server output, SSR) | anon key, server env (recommended names `SUPABASE_URL`, `SUPABASE_ANON_KEY`; not `PUBLIC_`) | Reads only, through RLS: public rows, enabled list rows, `is_public` settings, approved comments (named columns). Recommended over service-role reads: a page bug cannot leak drafts, emails, internal notes or private settings. |
| Astro islands (browser) | none | Call Astro endpoints only (`/api/chat`, `/api/comments`, `/api/likes`, `/api/contact`); never Supabase directly. Share = Web Share API / copy link / X / LinkedIn, no table. |
| Astro endpoints (server only) | `SUPABASE_SERVICE_ROLE_KEY` (+ `PORTFOLIO_VISITOR_SALT`, `GEMINI_API_KEY`) | Only the service_role RPCs in P3; no raw table writes. Rate limits as today (chat 20/10 min, contact 5/h, comments 10/h per IP; likes 60/h proposed). Never shipped to the client bundle. |
| admin app | user session (`@supabase/ssr`, authenticated) | All editing through RLS (`W(...)`), `log_audit` after each write. RAG ingest: server computes the Gemini embedding, inserts with the user session. JSON export (old "Backup") = selects under RLS. No service role for content. |
| Migration script (admin repo) | service role of NEW + read-only `DATABASE_URL` of OLD | Copy-only, upsert on `legacy_id`; Gokul runs it after a dry run. |
Final env names are fixed in each repo's `.env.example` at its build step.

#### P6. Old -> new mapping (migration script)
Script rules: dry run first (counts per table; unparsable JSON; unknown enum values; unresolved slugs; duplicate chapter slugs (suffix `-2`); `data:` URLs; rows that look like samples/tests, which arrive `draft` per decision 6; dropped settings keys WITH their old values), then the real run. Idempotent (upsert on `legacy_id`; singletons on `id`/`key`). Old DB stays read-only until verified. Everywhere: `id` -> `legacy_id`, `createdAt` -> `created_at`, `updatedAt` -> `updated_at`; unparsable JSON -> empty value + report line; `data:` URLs in embeds/images -> uploaded to `portfolio-media`, replaced by the public URL.
| Old | New | Transform |
|---|---|---|
| `AdminUser` (all fields) | not migrated | Supabase Auth (Google, decision 4) + `user_roles`; Gokul is already `super_admin`. Hashes and TOTP secrets are never copied (TOTP was never implemented). Other users sign in and request access; suggested roles: `admin` -> portfolio `admin`; `blog_editor` -> `member` + `posts.view/edit/publish`; `project_editor` -> `member` + `projects.view/edit`; `course_editor` -> `member` + `courses.view/edit`; `viewer` -> `member` + `*.view`. |
| `Profile.name, shortname, occupation, company, tagline, bio, location, email, avatar, resumeUrl` | `portfolio_profile.name, short_name, headline, company, tagline, bio, location, email_public, avatar_url, resume_url` | as-is |
| `Profile.twitter, linkedin, github, youtube, spotify, website, codechef, leetcode` | `portfolio_profile.socials` | object of the non-empty ones |
| `Profile.phone` | `portfolio_settings` `contact.phone` (`is_public = false`) | kept, never public (decision 17) |
| `Profile.codeReviewPhilosophy, agileExperience` | `portfolio_profile.extra` | `{ code_review_philosophy, agile_experience }` (unused by the site today; kept) |
| `Profile.skills` | `portfolio_skill_categories` + `portfolio_skills` | parse the 3 shapes `[{category, items}]`, `[{name, skills}]`, `["x"]` (as `parseSkillCategories`); empty -> P7 defaults |
| `Profile.certifications` | `portfolio_profile.certifications` | JSON array -> `text[]` |
| `Profile.carouselImages` | `portfolio_gallery` | one row per non-empty URL, `alt = ''`, position = index |
| `Profile.typingLines` | `portfolio_hero_lines` | trimmed non-empty, first 10; empty -> P7 defaults |
| `Profile.chatBotEnabled` | setting `sections.chat` | bool |
| `Profile.siteSettings` `title, description, siteUrl, ogImage` | settings `site.title`, `site.description`, `site.url`, `site.og_image` | |
| `siteSettings.heroGreeting`, `heroCtaText` + `heroCtaUrl` | `hero.greeting`, `hero.ctas` | CTA pair replaces the first default CTA if both set |
| `siteSettings.enableBlog, enableProjects, enableCourses, enableSnippets, enableComments, enableContact` | setting `sections` | missing = true |
| `siteSettings.contactEmail` | `contact.notify_email` (private) | fallback `Profile.email` |
| `siteSettings.footerText, copyrightName` | `footer.text`, `footer.copyright_name` | |
| `siteSettings.musicUrl`, `enableMusic` | one `portfolio_tracks` row; setting `music.enabled` | see P7 |
| `siteSettings.primaryColor, accentColor, fontFamily, layoutStyle, roundedCorners, enableAnimations` | dropped | design system v2 + `prefers-reduced-motion` decide (decision 14); none is read by the public site (grep 2026-11-25) |
| `siteSettings.enableParticles, enableCustomCursor, cursorMagneticSnap` | dropped | decision 16 |
| `siteSettings.favicon, showVisitorCount, showGithubStats, enableAutoEmbeds, enableRag` | dropped | favicon is a static asset; the other four are never read by the site; `enableRag` duplicates `chatBotEnabled` |
| `BlogPost.title, slug, excerpt, category, writtenBy, acceptedBy, embedUrl, behindTheScenes, type` | `portfolio_posts` same names in snake_case | `content` -> `body` (`body_format 'md'`), `coverImage` -> `cover_image_url` |
| `BlogPost.tags`, `embeds`, `resourceLinks` | `tags text[]`, `embeds text[]`, `resource_links jsonb` | comma split; newline split; JSON parse |
| `BlogPost.published, scheduledAt, status` | `status`, `published_at` | `published` -> `published`, `published_at = least(coalesce(scheduledAt, createdAt), now())`; not published + `scheduledAt` -> `published`, `published_at = scheduledAt`; else `review` if old status `review`, otherwise `draft` |
| `BlogIdea.*` | `portfolio_post_ideas` | tags comma split; `post_id` null (old app stored no link) |
| `Project.title, slug, shortDesc, description, role, process, results, behindTheScenes, featured, complexity, showTeam, adrContent, cicdSnippet, iacSnippet, performanceMetrics, securityImplementation` | `portfolio_projects` snake_case | `complexity` clamped 1-3 |
| `Project.banner, website, downloadLink, repository, videoUrl, dbSchemaUrl, observabilityUrl, testCoverageUrl, swaggerUrl, terminalSessionUrl` | `banner_url, website_url, download_url, repository_url, video_url, db_schema_url, observability_url, test_coverage_url, swagger_url, terminal_session_url` | |
| `Project.stack, screenshots, contributors, architectureDiagrams, embeds` | `stack text[]`, `screenshots text[]`, `contributors jsonb`, `architecture_diagrams jsonb`, `embeds text[]` | JSON parse; embeds newline split |
| `Project.architectureDiagramUrl` | folded into `architecture_diagrams` | appended as `{title: 'Architecture', url, description: '', type: 'other'}` if non-empty and not already present |
| (Project, Course had no publish flag) | `status 'published'`, `published_at = createdAt` | they are live today |
| `Course.title, slug, description, banner, embeds` | `portfolio_courses` (`banner_url`, `embeds text[]`) | `position` = old order by `createdAt` |
| `CourseChapter.title, slug, content, order, sectionName, chapterType, titleOverride, courseId, parentId` | `portfolio_course_chapters` (`body`, `position`, `section_name`, `chapter_type`, `title_override`, `course_id`, `parent_id`) | ids via `legacy_id` lookup; parents inserted first |
| `CourseChapter.linkedBlogSlug, linkedSnippetSlug` | `linked_post_id`, `linked_snippet_id` | slug -> new id; unresolved -> null + report |
| `ContactMessage.*` | `portfolio_messages` | `message` -> `body`; `repliedAt` -> `replied_at`; `replyNote` -> `reply_note` |
| `Todo.*` | `todos` with `app = 'portfolio'` | `entityType` `blog` stays text; `dueDate` string -> `date` (unparsable -> null + report) |
| `TodoHistory.*` | `todo_history` | `actor` -> `actor_label`, `actor_id` null |
| `Comment.name, email, content, entityType, entityId` | `portfolio_comments` | `content` -> `body`; `blog` -> `post`; `entityId` (a slug) -> target's new id, unresolved -> skipped + report; `status 'approved'` (live today), `is_author false`, `parent_id null`, `like_count 0` |
| `CodeSnippet.title, slug, description, type, language, category, includeInRag` | `portfolio_snippets` | `content` -> `body`; `comment` -> `internal_notes`; `tags` comma split; `tabs` JSON; `embeds` newline split; `demoType ''` -> null; `demoUrl, demoOutput` as-is; publish fields as `BlogPost` |
| `OperationLog.*` | `audit_log` with `app = 'portfolio'` | only rows newer than 90 days (older ones stay in the old DB backup); `actor` -> `actor_label`, `details` -> jsonb (parsed if JSON, else `{ "text": details }`) |
| old `documents` (SQL) | `documents` with `app = 'portfolio'` | re-embed from published content recommended (decision 10); a straight copy also works (same model, 768 dims) |
| old `chat_logs` (SQL) | not migrated | decision 10 |

#### P7. Default rows (reproduce today's live content)
- `portfolio_profile`: row 1 from `Profile` (P6).
- `portfolio_stats` (all `enabled`, `icon` null, positions 0-3): `3` `+` "Years Experience"; `30` `+` "REST APIs Built"; `98` `%` "System Uptime"; `30` `%` "Latency Reduced". Gokul may replace or drop "98% System Uptime" (plan input 2).
- `portfolio_hero_lines`: `Profile.typingLines` if non-empty, else today's code defaults in order: "Backend Engineer", "Microservices Architect", "Java & Spring Boot Specialist", "Distributed Systems Designer", "Cloud-Native Builder", "Problem Solver".
- Skills: `Profile.skills` if non-empty, else today's 5 default categories: Languages (Java 8/17, SQL, PL/SQL, C++, Python, JavaScript, TypeScript); Frameworks (Spring Boot, Oracle JET, Knockout.js, JUnit, Mockito, React, Next.js); Cloud & DevOps (Kubernetes, Docker, AWS, GCP, OCI, Terraform, Grafana, Prometheus); APIs & Architecture (RESTful APIs, SOAP, Microservices, JWT, OAuth 2.0, GraphQL); Tools & Platforms (Git, Linux, Postman, Flyway, Weblogic, Flexcube, Oracle BIP). `icon_slug` null, `is_primary` false until set in admin.
- `portfolio_tracks`: one row if `siteSettings.musicUrl` is set: `title` = file name without extension, `artist` '', `audio_url` = musicUrl, `position` 0, `enabled` true.
- `portfolio_chat_starters` (new feature, nothing shows today): 3 rows with `enabled = false` until Gokul reviews: "What is Gokul working on right now?", "Which projects show his backend work?", "What is his tech stack?".
- `portfolio_footer_links` (decision 15 groups, today's links): work: Projects `/projects`; writing: Blog `/blog`, Courses `/courses`, Snippets `/snippets`; about: About `/about`, Contact `/contact`; elsewhere: GitHub, LinkedIn, X (today's profile URLs, `external` true), Email (`mailto:` + `email_public`). "Home" dropped (decision 13).
- `portfolio_gallery`: from `carouselImages`.
- `portfolio_settings` (`is_public` true unless noted):
| Key | Default value (when the old value is empty) |
|---|---|
| `site.title` | `"Gokul Saraswat"` |
| `site.description` | `Profile.tagline` |
| `site.url` | `"https://gokulsaraswat.com"` |
| `site.og_image` | `""` |
| `theme.default` | `"system"` (decision 14) |
| `hero.greeting` | `"Hi, I'm"` (today's hero) |
| `hero.ctas` | `[{ "label": "View My Work", "href": "/projects", "variant": "primary" }, { "label": "Get in Touch", "href": "/contact", "variant": "secondary" }]` (today's hero buttons) |
| `hero.open_to_work` | `false` (chip off until Gokul turns it on) |
| `sections` | `{ "blog": true, "projects": true, "courses": true, "snippets": true, "comments": true, "contact": true, "chat": <Profile.chatBotEnabled> }` |
| `chat.greeting` | `"Hi! I'm Gokul's AI assistant. Ask me anything about his projects, blog posts, skills, or experience."` (today's widget) |
| `music.enabled` | `siteSettings.enableMusic` or `false` |
| `comments.moderation` | `"pending"` (decision 18; `"auto"` approves on submit) |
| `footer.text` | today's footer tagline (`src/components/site/footer.tsx`) |
| `footer.copyright_name` | `"Gokul Saraswat"` |
| `contact.notify_email` | private: `contactEmail`, else `Profile.email` |
| `contact.phone` | private: `Profile.phone` |

#### P8. Open items and future input
- PRT-F-001 (bestportofolio, GSpace feed `public/gspace-feed.json`: `{ generatedAt, source, projects[{name, summary, status, stack[], repo, updatedAt}], learning[{title, status, url, tags[]}] }`) is future input, NOT in v1: the Astro site reads the published JSON; no table. If admin curation is wanted later, add a setting `feed.gspace` `{ enabled, url }` (minor, additive).
- Next platform step: zod schemas + types for these shapes in `@gokulsaraswat/config` (minor release, Gokul OKs releases).
- Generic `content(app, slug, body)` / `app_config(app, key, value)` below are NOT used by the portfolio (dedicated tables + `portfolio_settings` instead).
- Gokul inputs (plan section 1): song list, real stat numbers, extra features, comments details.

### Hub `config.json`
Admin publishes it to a Supabase Storage public bucket; the hub validates with `parseHubConfig`. Bucket/path: TO BE UPDATED (admin + gokulmobilize chats).

TO BE UPDATED: `content(app, slug, body)` and `app_config(app, key, value jsonb)` shapes, MDX registry (`@gokulsaraswat/mdx`, waits for Calculator/WebWindow specs), base paths per app.
