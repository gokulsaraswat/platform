# Architecture: platform

Only what exists. Updated: 2026-10-31.

```
platform/                 npm workspace root (private, not published)
├── docs/                 MASTER docs for all repos (WORKLOG, CONTRACTS, REPO-KIT, PROMPTS)
├── packages/
│   └── ui/               @gokulsaraswat/ui
│       ├── src/tokens.css     CSS variables (:root light, .dark), framework-neutral
│       ├── src/tailwind.css   Tailwind v4 @theme inline mapping of tokens.css
│       └── test/              node:test consistency checks (light/dark parity, no undefined vars)
├── .changeset/           Changesets config + pending changesets
├── .github/workflows/    ci.yml: npm ci, build, lint, test on push to main + PRs
└── graphify-out/         code map (graphify update .)
```

Consumer flow: app imports `tokens.css` (+ `tailwind.css` if Tailwind) -> overrides color vars for its accent.
Planned (not built): React footer in `ui`; `packages/mdx`, `auth`, `config`; release workflow publishing to GitHub Packages.
