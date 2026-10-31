# CONTRACTS (master)

What platform exposes and what other repos expect. Update when an interface changes. Updated: 2026-10-31.

## Packages
| Package | Version | Status | Exposes |
|---|---|---|---|
| `@gokulsaraswat/ui` | 0.0.0 (unpublished; 0.1.0 pending) | tokens + footer built; publish next | `.` (React), `./tokens.css`, `./tailwind.css`, `./styles.css` (see below) |
| `@gokulsaraswat/mdx` | - | planned | MDX component registry |
| `@gokulsaraswat/auth` | - | planned | Supabase client + role helpers |
| `@gokulsaraswat/config` | - | planned | types/schema for `config.json` and roles |

Registry: GitHub Packages (`https://npm.pkg.github.com`). Scope must match the GitHub owner, hence `@gokulsaraswat`.
Installing requires a token with `read:packages` (local `.npmrc` or CI secret `NODE_AUTH_TOKEN`), even for public packages.

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

## Cross-repo contracts
TO BE UPDATED: Supabase tables (`content`, `app_config`, `user_roles`, `role_permissions`), `config.json` schema,
MDX registry, roles/permissions, base paths. Decided names live in docs/WORKLOG.md "Decisions"; shapes are not defined yet.
