# FEATURES: platform (do-not-break contract)

One line per feature. Verify = how to prove it still works. Run from the repo root unless stated.
Baseline 2026-11-25 (Node 24.14.1, npm 11.11.0): build 3.4 s, lint clean 3.6 s, tests 17/17 (config 3, auth 4, ui 10) 4.9 s,
node_modules 73 MB, dist ui 26 KB / config 18 KB / auth 6 KB.

## Workspace
| Feature | Verify |
|---|---|
| npm workspace (config -> auth -> ui build order) | `npm ci && npm run build` exits 0 |
| Lint all packages (ESLint 10 + typescript-eslint) | `npm run lint` exits 0, no problems |
| Tests all packages (node:test, run after build) | `npm test`: 17 pass, 0 fail |
| Changesets versioning (`npm run changeset`, `version-packages`) | `npx changeset status` runs without error |

## @gokulsaraswat/config (consumers: admin, gokulmobilize)
| Export | Verify |
|---|---|
| `appIds`, `AppId` (hub, admin, portfolio, gspace, studio, gym) | test `hub.test.mjs`; admin + gokulmobilize type-check |
| `roles`, `Role`, `ALL_APPS`, `UserRole` | used by auth; admin `src/lib/session.ts` type-checks |
| `tileModes`, `hubConfigSchema`, `parseHubConfig`, `HubConfig`, `HubTile` (config.json v1) | `hub.test.mjs` (valid, duplicate id, bad href) |

## @gokulsaraswat/auth (consumer: admin)
| Export | Verify |
|---|---|
| `hasRole(rows, app, min)`, `isSuperAdmin(rows)` | `roles.test.mjs` |
| `getUserRoles(client, userId)` over `user_roles` (RLS enforces visibility) | `roles.test.mjs` with a stub client |

## @gokulsaraswat/ui (consumers: admin tokens only, gokulmobilize, bestportofolio)
| Export | Verify |
|---|---|
| `tokens.css` (light `:root`, dark `.dark`): colors, radius, fonts, type scale, shadows, motion | `tokens.test.mjs`; imported by admin, gokulmobilize, bestportofolio |
| `tailwind.css` (Tailwind v4 `@theme inline` mapping) | `tokens.test.mjs`; admin `globals.css` builds |
| `styles.css` (gk- footer classes, tokens only) | imported by gokulmobilize `Base.astro`, bestportofolio `layout.tsx` |
| `Footer` (+ `FooterProps`, `FooterColumn`, `FooterLink`, `FooterSocial`), `linkComponent`, `basePath` | `components.test.mjs` SSR render |
| `LegalPage` (+ `LegalPageProps`) | `components.test.mjs` |
| `footerPages`, `FooterPageSlug`, `pagePath` | `components.test.mjs` |
| `LinkComponent`, `LinkProps` types | gokulmobilize type-checks |

## @gokulsaraswat/ui/v2 (since 0.2.0)
| Feature | Verify |
|---|---|
| `flavors.json` -> generated `v2/tokens.css`, `v2/tailwind.css`, `v2/flavors.ts`, DESIGN-BRIEF raw block | `npm run gen -w @gokulsaraswat/ui`; `node packages/ui/scripts/gen.mjs --check` exits 0 |
| WCAG AA for 162 token pairs (3 flavors x light/dark) | `npm run contrast -w @gokulsaraswat/ui`; test `v2.test.mjs` |
| `v2/components.css` classes + React wrappers (`@gokulsaraswat/ui/v2`) | `v2.test.mjs` SSR tests (Button, Field, Switch, Alert, Badge, states, Tabs, Dialog) |
| v1 untouched (exports, variables, classes) | `v2.test.mjs` "v2 is additive"; existing tokens/components tests |
| Preview page | open `packages/ui/preview/index.html?flavor=atelier&theme=dark`; switch flavor/theme; Grant role opens dialog, toast on confirm |

## CI / release
| Feature | Verify |
|---|---|
| CI (`ci.yml`): npm ci, build, lint, test on push to main + PRs | GitHub Actions run green on main |
| Release (`release.yml`): lint, test, `changeset publish` unpublished versions to GitHub Packages, push tags | Actions log; no publish when versions unchanged |
| Install smoke (`install-smoke.yml`): installs published packages into a scratch consumer, renders Footer, type-checks | runs after Release; `workflow_dispatch` |

## Kit scripts
| Feature | Verify |
|---|---|
| `scripts/sync-kit.sh` (check): per-repo kit report (RULES.md copy, ARCHITECTURE, BACKLOG, pointers, dirty/ahead/behind) | `bash scripts/sync-kit.sh` exits 0 with one line per repo |
| `sync-kit.sh --fix`: copy RULES.md, add pointers, create missing BACKLOG.md | dry check first; diff shows only kit files |
| `sync-kit.sh --index`: regenerate cross-repo index in `docs/BACKLOG.md` | only the INDEX block changes |
| `sync-kit.sh --push`: commit + push only kit files per repo | `git show --stat` lists kit files only |
| `sync-kit.sh --install-hooks`: warn-only pre-push hook | `.git/hooks/pre-push` contains `sync-kit pre-push` |
| Private-path guard: check flags `PRIVATE-FILES-TRACKED(n)`; --push aborts if Not Repository/ or PRIVATE-*.md is staged; missing repos skipped | scratch workspace with a tracked `PRIVATE-X.md` -> check shows the flag, --fix exits 0 |

## Docs (master copies for all repos)
| Feature | Verify |
|---|---|
| `docs/RULES.md` (source of truth; root `RULES.md` is a copy) | `cmp RULES.md docs/RULES.md` |
| `docs/CONTEXT.md`, `docs/CONTRACTS.md`, `docs/ARCHITECTURE.md`, `docs/BACKLOG.md` (master index), `docs/PROMPTS.md`, `docs/REPO-KIT.md` | files exist, links resolve |
