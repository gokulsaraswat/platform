# Architecture: platform

Only what exists. Updated: 2026-10-31.

```
platform/                 npm workspace root (private, not published)
├── docs/                 MASTER docs for all repos (WORKLOG, CONTRACTS, REPO-KIT, PROMPTS)
├── packages/             build order: config -> auth -> ui (root workspaces list)
│   ├── config/           @gokulsaraswat/config: appIds, roles, UserRole, hub config.json zod schema
│   ├── auth/             @gokulsaraswat/auth: hasRole/isSuperAdmin, getUserRoles(client) over user_roles (peer supabase-js)
│   └── ui/               @gokulsaraswat/ui
│       ├── src/tokens.css     CSS variables (:root light, .dark), framework-neutral
│       ├── src/tailwind.css   Tailwind v4 @theme inline mapping of tokens.css
│       ├── src/styles.css     gk- prefixed component styles (tokens only)
│       ├── src/pages.ts       footerPages list + pagePath()
│       ├── src/link.tsx       LinkComponent type + default <a>
│       ├── src/Footer.tsx     Footer (brand, columns, socials, fixed legal row)
│       ├── src/LegalPage.tsx  placeholder page for a footerPages slug
│       ├── src/index.ts       public exports -> dist/ (tsc)
│       ├── src/v2/            design system v2 (additive, `@gokulsaraswat/ui/v2`)
│       │   ├── flavors.json        SOURCE: shared scales + 3 flavors (instrument, atelier, margin) x light/dark
│       │   ├── tokens.css          generated --gk-* variables, flavor/theme selectors
│       │   ├── tailwind.css        generated Tailwind v4 mapping (gk-namespaced)
│       │   ├── flavors.ts          generated raw values for JS
│       │   ├── components.css      gk- component classes (hand-written, tokens only)
│       │   └── *.tsx, index.ts     thin React wrappers (Button, Field, Dialog, Tabs, ...)
│       ├── scripts/gen.mjs    flavors.json -> v2/tokens.css, v2/tailwind.css, v2/flavors.ts, docs/DESIGN-BRIEF.md raw block (--check for drift)
│       ├── scripts/contrast.mjs  WCAG contrast audit of every token pair (used by tests)
│       ├── preview/index.html one sample screen per flavor + theme switcher (not published)
│       └── test/              node:test: token consistency, SSR render, v2 drift + contrast + additivity
├── .changeset/           Changesets config + pending changesets
├── .github/workflows/    ci.yml: npm ci, build, lint, test on push to main + PRs
│                         release.yml: on main, lint + test, `changeset publish` to GitHub Packages, push tags
│                         install-smoke.yml: after Release, installs the published ui into a scratch consumer, renders Footer, type-checks
├── scripts/sync-kit.sh   kit sync across sibling repos (check, --fix, --index, --push, --install-hooks); refuses Not Repository/ + PRIVATE-*.md
└── graphify-out/         code map (graphify update .)
```

Consumer flow: app imports `tokens.css` (+ `tailwind.css` if Tailwind) + `styles.css` -> overrides color vars for its accent
-> renders `<Footer siteName basePath linkComponent …/>` in its layout and a route per `footerPages` slug.
Tooling: TypeScript 6.0 (tsc -> dist, NodeNext ESM), ESLint 10 + typescript-eslint (root eslint.config.mjs).
Shared TS settings: root `tsconfig.base.json`. Planned (not built): `packages/mdx` (waits for Calculator/WebWindow specs).
