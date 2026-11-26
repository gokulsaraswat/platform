# Upgrade program: status and how to resume (all 7 repos)

Master status for the cross-repo upgrade started 2026-11-25. Every repo's WORKLOG.md points here. Public-safe: no secrets.
Owner-only notes (decisions log, agent rules) live outside git at the workspace root: REPO-UPGRADE-PROGRESS.md,
PORTFOLIO-ADMIN-ASTRO-PLAN.md, REPO-UPGRADE-AGENT-RULES.md. If you have them, read them first; this file is the summary.

## Objectives (decided by Gokul)
- Every repo: A feature inventory (docs/FEATURES.md) + baseline, B bugs, C speed, D real redesign on a branch (never merged
  without Gokul's "merge"), E docs. Nothing that works today may break.
- Shared look: platform design system v2 (`@gokulsaraswat/ui` 0.2.0, docs/DESIGN-BRIEF.md). Flavors: Instrument (admin, omni),
  Atelier (gokulmobilize), Margin (Markdown-studio, GSpace). bestportofolio: own direction on v2.
- Portfolio program (docs/CONTRACTS.md "portfolio data contract"): ALL admin moves to the admin repo; data moves to the new
  Supabase project; public site rebuilt in Astro on branch `astro`; Markdown -> MDX via a new `@gokulsaraswat/mdx`; features:
  chat starter chips, playlist music player, merged skills, editable stats, centered hero with rotating line, comments with
  replies/likes/share + moderation, two-tier footer. All SQL is written as files and applied only by Gokul.
- Priority: admin, bestportofolio, GSpace, gokulmobilize first; then Markdown-studio and gokul-omni-converter.

## Status per repo (2026-11-26)
| Repo | Done | Next |
|---|---|---|
| platform | design system v2 released (ui 0.2.0); sync-kit fixes; portfolio data contract draft (27ea397); shared sign-in (auth/config 0.2.0, other session); hook fix ed4f41b | config portfolio schemas + `@gokulsaraswat/mdx` v0 (release needs Gokul's OK) |
| bestportofolio | Prisma back to 6.19, deploys unblocked (03972c2); Phase A inventory/baseline/kit (21422a9..fc1f645); hook fix b496241; Phase B (2026-11-26): phone out of public profile + JSON-LD (7e36f52), no writes in public GETs (0a347c6), no chat prompt logging (c54c7b8), robots.txt (9bf011a), chat config check without Gemini (abf416d), F2 decision (5c6e827); Phase C: 18 unused deps removed (e44f18a, Vercel deploy ok) | cookie banner removal + privacy text (waiting on Gokul); delete 29 unused files (grep proof ready, waiting on Gokul); then hand to the sign-in session; then `astro` branch |
| bestportofolio `astro` branch | design fixtures + 3 proposals (Signal, Blueprint, Quiet); judges picked **Signal** (23 vs 20 vs 17.5) | build design/final from Signal with all judge must-fixes, then the Astro rebuild |
| admin | Google/GitHub sign-in, access requests (other session); hook fix 05c846c; SQL review of all 5 migrations, no blocking issue (docs/SQL-REVIEW.md, dd9639f); loading skeleton (7e210af) | Phase C speed + remaining Phase B checks (need `npm ci`: GitHub Packages token for `gokulsaraswat` missing on this Mac); portfolio SQL drafts; portfolio admin section after mdx release |
| GSpace | sign-in, guest mode (other session); hook fix be896d3; Phase A inventory + baseline (docs/FEATURES.md, 8aa0f5d, cdb592f); escapeHtml/escapeJs quote-escape fix (75d21ef) | more Phase B/C, then D (Margin) on redesign/GSpace; MDX after release |
| gokulmobilize | Phase A (ba596d2..080b576), Phase B 4 bug fixes + precache 338->123 KB (63b61bd..11fd4df); sign-in (86613d6, other session); hook fix d38f3c1 | Phase C speed: BLOCKED on GitHub Packages auth (`npm ci` 401; node_modules is empty), then D, review |
| Markdown-studio | owned by its own session now (plan MARKDOWN-STUDIO-PLAN.md at workspace root); FEATURES a1f5ba4, XSS fix 98d7541, a11y b309f7a; hook fix 7c0d5a8 | continues in that session |
| gokul-omni-converter | pypdf 7 fix beca886; hook fix 2e5e620; paused by Gokul (WIP in stash@{0}) | resume after the priority repos |

## Rules that apply to every session
- Before touching a repo: git status + git log; other sessions may be working. Stage only your own paths. Never force-push,
  never --no-verify, never commit .env*, secrets, PRIVATE-*.md or "Not Repository/".
- Sign-in/auth code is owned by the sign-in session; ask before changing it.
- Deletions only with grep evidence; redesigns stay on branches; SQL never applied by an agent; npm releases only with Gokul's OK.

## Resume
0. Newest handoff (2026-11-27): `admin/docs/upgrade-program/NEXT-SESSION.md` section 0 (pending order, where each task runs, tooling gotchas). Decision: logic first (mdx package, admin portfolio SQL drafts, admin portfolio section), design and migration later.
1. Read this file, then the repo's WORKLOG.md and docs/BACKLOG.md.
2. Continue the "Next" column above for the repo in priority order.
3. Update this table and the repo's WORKLOG.md in the same commit as the work.
