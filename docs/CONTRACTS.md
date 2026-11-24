# CONTRACTS (master)

What platform exposes and what other repos expect. Update when an interface changes. Updated: 2026-11-25.

## Packages
| Package | Version | Status | Exposes |
|---|---|---|---|
| `@gokulsaraswat/ui` | 0.2.0 | published by Release workflow | `.` (React), `./tokens.css`, `./tailwind.css`, `./styles.css`; since 0.2.0 `./v2`, `./v2/tokens.css`, `./v2/components.css`, `./v2/tailwind.css` (see below) |
| `@gokulsaraswat/mdx` | - | planned | MDX component registry |
| `@gokulsaraswat/auth` | 0.1.0 | published | `hasRole`, `isSuperAdmin`, `getUserRoles` |
| `@gokulsaraswat/config` | 0.1.0 | published | app ids, roles, `UserRole`, hub `config.json` schema |

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
| `appIds`, `AppId` | `hub`, `admin`, `portfolio`, `gspace`, `studio`, `gym` |
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
Client-side checks only shape the UI; RLS on every table is the real enforcement.

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
| `app` | `text` | not null, one of `hub`, `admin`, `portfolio`, `gspace`, `studio`, `gym` |
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

### Hub `config.json`
Admin publishes it to a Supabase Storage public bucket; the hub validates with `parseHubConfig`. Bucket/path: TO BE UPDATED (admin + gokulmobilize chats).

TO BE UPDATED: `content(app, slug, body)` and `app_config(app, key, value jsonb)` shapes, MDX registry (`@gokulsaraswat/mdx`, waits for Calculator/WebWindow specs), base paths per app.
