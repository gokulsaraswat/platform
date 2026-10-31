# WORKLOG: platform

Master status of all repos: platform/docs/WORKLOG.md. Update this file after every step.

## Current state (2026-10-31)
- Repo kit in place; npm workspace root + Changesets (`.changeset/config.json`, baseBranch main, access restricted).
- `packages/ui` (`@gokulsaraswat/ui` 0.0.0, unpublished): `tokens.css` + `tailwind.css`; pending changeset bumps it to 0.1.0.
- Verified: `npm test` 4/4 pass; Tailwind 4.3.3 compiles the tokens (scratch dir). No build/lint yet (CSS only; eslint + tsc come with React).
- CI: `.github/workflows/ci.yml` (first run on this push). `graphify-out/` generated; git hooks not installed.

## Done
- 2026-10-31 Step 2: `@gokulsaraswat/ui` tokens (`tokens.css`, `tailwind.css`), tests, CI, graphify-out, changeset.
- 2026-10-31 Step 1: kit files (CLAUDE.md from Progress, README, docs/ARCHITECTURE.md, docs/CONTRACTS.md, LICENSE, SECURITY.md, .gitignore, .env.example, PR template, .claude-session.json), workspace root, Changesets.

## Decisions (2026-10-31)
- Tokens: bestportofolio colors/radius (shadcn names, oklch, `.dark` class); Tailwind v4.3.3 type scale + shadows; motion enter `cubic-bezier(0.16,1,0.3,1)`, exit `cubic-bezier(0.4,0,1,1)`, durations 150/300/400ms (midpoints of CLAUDE.md ranges). Ship `tailwind.css` mapping.
- npm workspaces; tokens as CSS variables + React components; Changesets; GitHub Packages, CI-only publish on main.
- Scope `@gokulsaraswat/*` (GitHub Packages requires scope = owner), replacing `@gokul/*` in all docs.
- Repo public, all rights reserved. Legal pages ship with placeholder text in v0.1. GSpace gets tokens only in v0.1.

## In progress / next
- Step 3: React Footer + legal/SEO page placeholders (adds eslint + tsc). Full list: `.claude-session.json` sprint.todo_next.

## Blockers / requests to other repos
- none logged
- Owner: GitHub description/topics/branch protection need the `gh` CLI (not installed) or the web UI; done at the end.
- Owner: run `graphify hook install` once (agent was blocked from installing git hooks).

## Reminders
- TO BE UPDATED: scope of this repo is not final; see docs/KICKOFF-PROMPT.md "Questions to ask me first".
