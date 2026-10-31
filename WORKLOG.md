# WORKLOG: platform

Master status of all repos: platform/docs/WORKLOG.md. Update this file after every step.

## Current state (2026-10-31)
- Repo kit in place; npm workspace root + Changesets (`.changeset/config.json`, baseBranch main, access restricted).
- `packages/ui` (`@gokulsaraswat/ui` 0.0.0, unpublished): `tokens.css`, `tailwind.css`, `styles.css`, React `Footer` + `LegalPage`; version 0.1.0 (published by Release workflow).
- Verified: build (tsc) ok, lint clean, `npm test` 10/10; Tailwind 4.3.3 compiles the tokens; footer checked in browser (light/dark, desktop/mobile).
- CI: `.github/workflows/ci.yml`, green on main. Release: `.github/workflows/release.yml` publishes unpublished versions on main.
- `npm audit`: 1 moderate (minimatch ReDoS, GHSA-g3hv-75wg-m249) in the eslint dev chain only; no upstream fix; not shipped. `graphify-out/` generated; git hooks not installed.

## Done
- 2026-10-31 Step 4: release workflow + `@gokulsaraswat/ui` 0.1.0 (CHANGELOG).
- 2026-10-31 Step 3: React `Footer`, `LegalPage`, `footerPages`, `styles.css`; tsc + ESLint; SSR tests.
- 2026-10-31 Step 2: `@gokulsaraswat/ui` tokens (`tokens.css`, `tailwind.css`), tests, CI, graphify-out, changeset.
- 2026-10-31 Step 1: kit files (CLAUDE.md from Progress, README, docs/ARCHITECTURE.md, docs/CONTRACTS.md, LICENSE, SECURITY.md, .gitignore, .env.example, PR template, .claude-session.json), workspace root, Changesets.

## Decisions (2026-10-31)
- Footer: plain CSS (`styles.css`, gk- classes), `<a>` default + `linkComponent` prop, `basePath` prefix, fixed 9-link legal row + app props (tagline, columns, socials), no icon dependency. Slugs: privacy, terms, cookies, data-deletion, accessibility, sitemap, faq, about, contact.
- Releases: version locally (`npx changeset version`) and push; CI only publishes (no bot PRs).
- TypeScript pinned ~6.0 (typescript-eslint 8 supports <6.1; TS 7 is out).
- Tokens: bestportofolio colors/radius (shadcn names, oklch, `.dark` class); Tailwind v4.3.3 type scale + shadows; motion enter `cubic-bezier(0.16,1,0.3,1)`, exit `cubic-bezier(0.4,0,1,1)`, durations 150/300/400ms (midpoints of CLAUDE.md ranges). Ship `tailwind.css` mapping.
- npm workspaces; tokens as CSS variables + React components; Changesets; GitHub Packages, CI-only publish on main.
- Scope `@gokulsaraswat/*` (GitHub Packages requires scope = owner), replacing `@gokul/*` in all docs.
- Repo public, all rights reserved. Legal pages ship with placeholder text in v0.1. GSpace gets tokens only in v0.1.

## In progress / next
- Step 6: GitHub repo settings (description, topics, branch protection). Full list: `.claude-session.json` sprint.todo_next.

## Blockers / requests to other repos
- none logged
- Owner: GitHub description/topics/branch protection need the `gh` CLI (not installed) or the web UI; done at the end.
- Owner: run `graphify hook install` once (agent was blocked from installing git hooks).

## Reminders
- TO BE UPDATED: scope of this repo is not final; see docs/KICKOFF-PROMPT.md "Questions to ask me first".
