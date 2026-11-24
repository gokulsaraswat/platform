# WORKLOG: platform

Master status of all repos: platform/docs/WORKLOG.md. Update this file after every step.

## Current state (2026-11-25)
- Repo kit in place; npm workspace root + Changesets (`.changeset/config.json`, baseBranch main, access restricted).
- `packages/ui` (`@gokulsaraswat/ui` 0.1.0, published): `tokens.css`, `tailwind.css`, `styles.css`, React `Footer` + `LegalPage`; version 0.1.0 (published by Release workflow).
- Verified: build (tsc) ok, lint clean, `npm test` 10/10; Tailwind 4.3.3 compiles the tokens; footer checked in browser (light/dark, desktop/mobile).
- CI: `.github/workflows/ci.yml`, green on main. Release: `.github/workflows/release.yml` publishes unpublished versions on main.
- `packages/config` + `packages/auth` 0.1.0 (published by Release workflow; CHANGELOGs).
- `npm audit`: 0 vulnerabilities (2026-11-25: eslint 10.15.0, typescript-eslint 8.74.0 pull patched minimatch). `.nvmrc` = 24 (matches CI). `graphify-out/` generated; git hooks not installed.

## Done
- 2026-11-25 Step 1a (PLT-F-004, draft v1): CONTRACTS.md "Portfolio data (NEW Supabase project)": 17 `portfolio_*` tables + shared `todos`, `todo_history`, `audit_log`, `documents` (vector 768); RLS intent per table on the existing `has_permission('portfolio', '<area>.edit')` catalog (= portfolio admins + super admin unless a key is granted); comments (one-level replies, pending/approved/rejected, is_author, like_count) + reactions (one like per visitor hash) written only through Astro endpoints -> service_role RPCs; `match_documents` (+ `filter_app`, same call body); buckets `portfolio-media`, `portfolio-audio`; anon-key + RLS reads for the Astro site; old->new mapping of all 13 Prisma models + `siteSettings` keys (dropped ones with reasons); default rows (4 stats, 6 hero lines, 5 skill categories, 1 track, footer links, settings). Docs only; no package change. SQL is the admin repo's job; nothing applied.
- 2026-11-25: CONTRACTS: `list_app_members(p_app)` RPC (app admins: members + super admins with email/name) and "remove member = delete the `user_roles` row" rule, in the access_requests section (owner admin, ADM-F-003; migration `20261125130000_app_members.sql` NOT applied yet). Admin login also gained Google sign-in (ADM-F-002, admin-only). No package change.
- 2026-11-25: CONTRACTS: `access_requests` table + RPCs `request_access`, `decide_access_request` (owner admin, ADM-F-001, admin commit bda9e14; migration NOT applied yet). Consumer: GSpace sign-in gate. No package change.
- 2026-11-25 RELEASED: `@gokulsaraswat/ui` 0.2.0 (design system v2, additive; merged 55655a4). Consumers adopt by bumping to ^0.2.0 when their redesign starts; nothing breaks for v1 users.
- 2026-11-25 Phase D (branch redesign/platform, awaiting "merge"): design system v2 in packages/ui (flavors.json source, generator, tokens/components/tailwind CSS, React wrappers, 12 new tests, contrast 162/162 AA), preview page, docs/DESIGN-BRIEF.md. Flavors: instrument (admin, omni), atelier (hub), margin (Markdown-studio, GSpace). Release (ui 0.2.0 changeset) waits for Gokul's OK.
- 2026-11-25 Gate 2 (approved): removed byte-identical nested copies docs/project/agent/Agent/ and docs/project/prompts/prompts/ (8 files, no references). Decision: other repos' docs/master, docs/project, WORKLOG-PROJECT.md become one pointer file, done in each repo's upgrade turn.
- 2026-11-25 Upgrade phase C: CI test step skips the duplicate pretest rebuild (`npm test --ignore-scripts` after `npm run build`): 10.5 s -> 4.0 s locally, 17/17. Packed sizes: ui 5.5 KB, config 1.9 KB, auth 1.3 KB (no maps). No export removed: all are public API.
- 2026-11-25 PLT-B-003: CLAUDE.md no longer tells agents to commit PRIVATE-* files (d75a2eb).
- 2026-11-25 PLT-B-001: sync-kit.sh covers GSpace, skips missing repos, guards private paths; --index regenerated (now lists admin, mobilize, portfolio, GSpace items).
- 2026-11-25 Upgrade phase A: docs/FEATURES.md (do-not-break inventory + baseline: build 3.4 s, lint clean, tests 17/17, node_modules 73 MB).
- 2026-11-25: employer to-dos removed from docs/project/Ideas.md in all 7 repos (one commit each; history unchanged).
- 2026-11-25: UI/motion upgrade prompt added to docs/PROMPTS.md (master) as TODO PLT-I-001; per-repo items ADM-I-001, MOB-I-001, PRT-I-001. No package changes.
- 2026-10-31 Step 7: `@gokulsaraswat/config` + `@gokulsaraswat/auth` (mdx deferred: no Calculator/WebWindow spec).
- 2026-10-31 Step 5: install smoke test workflow; 0.1.0 installs, renders and type-checks from the registry (run 41202858931).
- 2026-10-31 Step 4: release workflow + `@gokulsaraswat/ui` 0.1.0 (CHANGELOG).
- 2026-10-31 Step 3: React `Footer`, `LegalPage`, `footerPages`, `styles.css`; tsc + ESLint; SSR tests.
- 2026-10-31 Step 2: `@gokulsaraswat/ui` tokens (`tokens.css`, `tailwind.css`), tests, CI, graphify-out, changeset.
- 2026-10-31 Step 1: kit files (CLAUDE.md from Progress, README, docs/ARCHITECTURE.md, docs/CONTRACTS.md, LICENSE, SECURITY.md, .gitignore, .env.example, PR template, .claude-session.json), workspace root, Changesets.

## Decisions (2026-10-31)
- Footer: plain CSS (`styles.css`, gk- classes), `<a>` default + `linkComponent` prop, `basePath` prefix, fixed 9-link legal row + app props (tagline, columns, socials), no icon dependency. Slugs: privacy, terms, cookies, data-deletion, accessibility, sitemap, faq, about, contact.
- App ids: hub, admin, portfolio, gspace, studio, gym. Roles: super_admin (global, app '*') > admin > member (per app). No permissions table yet.
- Hub config.json v1: { version: 1, apps: [{ id, name, href, mode: bundled|remote|external, enabled }] }, validated with zod 4.
- auth takes the app's Supabase client as an argument (no wrapper). Packages are ESM-only.
- Releases: version locally (`npx changeset version`) and push; CI only publishes (no bot PRs).
- TypeScript pinned ~6.0 (typescript-eslint 8 supports <6.1; TS 7 is out).
- Tokens: bestportofolio colors/radius (shadcn names, oklch, `.dark` class); Tailwind v4.3.3 type scale + shadows; motion enter `cubic-bezier(0.16,1,0.3,1)`, exit `cubic-bezier(0.4,0,1,1)`, durations 150/300/400ms (midpoints of CLAUDE.md ranges). Ship `tailwind.css` mapping.
- npm workspaces; tokens as CSS variables + React components; Changesets; GitHub Packages, CI-only publish on main.
- Scope `@gokulsaraswat/*` (GitHub Packages requires scope = owner), replacing `@gokul/*` in all docs.
- Repo public, all rights reserved. Legal pages ship with placeholder text in v0.1. GSpace gets tokens only in v0.1.

## Assumptions (Step 1a, 2026-11-25; least-risky choices, Gokul may overrule)
- Backlog ID PLT-F-004 (the run asked for PLT-F-002, already used for access_requests; IDs are never reused).
- All portfolio-only tables prefixed `portfolio_` (one shared DB; avoids future clashes with GSpace posts/courses). `todos` is shared with an `app` column (admin answer 5: one platform board).
- Writes use `has_permission('portfolio', '<area>.edit')` from the existing catalog instead of a bare admin check: identical to "portfolio admins or super_admin" until an admin grants a key (delegated admin, admin answer 1).
- Comments default to `pending` (plan decision 18 supersedes admin answer 2 "live immediately"); old comments migrate `approved` because they are live today; setting `comments.moderation = "auto"` restores auto-approve.
- Blog ideas stay a separate table linked by `post_id` (one pipeline in the admin UI) rather than merged into posts.
- Phone kept as a private setting (not public, decision 17), never dropped; unused profile fields kept in `profile.extra`.
- Chat starters seeded disabled (new feature; nothing changes on the live site until Gokul enables them). `hero.open_to_work` defaults false.
- `documents` stays named `documents` (+ `app` column) and `match_documents` keeps its call body; executable by service_role only.

## In progress / next
- Next (Step 1b): portfolio zod schemas/types in `@gokulsaraswat/config` from the CONTRACTS "Portfolio data" section (no release without Gokul's OK); then `@gokulsaraswat/mdx` v0. Admin step turns the contract into SQL + tests.
- Next: mdx when Calculator/WebWindow specs exist; owner: GitHub settings (step 6). graphify hook now installed. Full list: `.claude-session.json` sprint.todo_next.

## Blockers / requests to other repos
- none logged
- Owner: GitHub description/topics/branch protection need the `gh` CLI (not installed) or the web UI; done at the end.
- Owner: run `graphify hook install` once (agent was blocked from installing git hooks).

## Reminders
- TO BE UPDATED: scope of this repo is not final; see docs/KICKOFF-PROMPT.md "Questions to ask me first".
