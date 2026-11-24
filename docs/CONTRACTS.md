# CONTRACTS (master)

What platform exposes and what other repos expect. Update when an interface changes. Updated: 2026-10-31.

## Packages
| Package | Version | Status | Exposes |
|---|---|---|---|
| `@gokulsaraswat/ui` | 0.1.0 | published by Release workflow | `.` (React), `./tokens.css`, `./tailwind.css`, `./styles.css` (see below) |
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

## `@gokulsaraswat/ui/v2` (design system v2; additive, UNRELEASED: on branch `redesign/platform`, ships as ui 0.2.0 after approval)
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

### Hub `config.json`
Admin publishes it to a Supabase Storage public bucket; the hub validates with `parseHubConfig`. Bucket/path: TO BE UPDATED (admin + gokulmobilize chats).

TO BE UPDATED: `content(app, slug, body)` and `app_config(app, key, value jsonb)` shapes, MDX registry (`@gokulsaraswat/mdx`, waits for Calculator/WebWindow specs), base paths per app.
