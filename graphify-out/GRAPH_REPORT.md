# Graph Report - platform  (2026-10-31)

## Corpus Check
- 46 files · ~14,089 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 4, .css 2, .example 1)

## Summary
- 348 nodes · 402 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ec2407d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- README.md
- WORKLOG
- ui/package.json
- package.json
- REPO SECTIONS
- tokens.test.mjs
- config.json
- 🤖 System Architecture & Co-Worker Protocol
- components.test.mjs
- Kickoff prompt: platform
- pull_request_template.md
- .changeset/README.md
- PLANNING-CHAT-PROMPT.md
- SECURITY.md
- Footer.tsx
- ui/tsconfig.json
- auth/package.json
- auth/src/roles.ts
- config/package.json
- config/src/index.ts
- compilerOptions
- auth/tsconfig.json
- config/tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 19 edges
2. `REPO SECTIONS` - 9 edges
3. `Footer()` - 9 edges
4. `compilerOptions` - 9 edges
5. `🤖 System Architecture & Co-Worker Protocol` - 9 edges
6. `LegalPage()` - 7 edges
7. `CONTRACTS (master)` - 7 edges
8. ``@gokulsaraswat/config`` - 7 edges
9. `scripts` - 7 edges
10. `WORKLOG: platform` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Session log` --references--> `parseHubConfig()`  [INFERRED]
  docs/WORKLOG.md → packages/config/src/hub.ts
- `Hub `config.json`` --references--> `parseHubConfig()`  [INFERRED]
  docs/CONTRACTS.md → packages/config/src/hub.ts
- `Packages` --references--> `UserRole`  [INFERRED]
  docs/CONTRACTS.md → packages/config/src/roles.ts
- ``@gokulsaraswat/ui` components` --references--> `LinkComponent`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx
- ``@gokulsaraswat/ui` components` --references--> `LinkProps`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx

## Import Cycles
- None detected.

## Communities (23 total, 4 thin omitted)

### Community 0 - "README.md"
Cohesion: 0.11
Nodes (13): AGENTS.md: platform, COLLABORATORS: platform, Architecture: platform, Definition of done (any step), Deploy-ready rules (every repo), Master docs (live in `platform/docs/`), Repo Kit (every repo must have these), Shared constants (from `@gokulsaraswat/ui`, same on every app) (+5 more)

### Community 1 - "WORKLOG"
Cohesion: 0.09
Nodes (23): Agreed order, Architecture (agreed 2026-10-31), Cleanup scan: `/cleanscan` (Claude slash command), Commit + push everything: `/gitmd` (Claude slash command), Current focus, Decisions, Dropped, Far later (+15 more)

### Community 2 - "ui/package.json"
Cohesion: 0.06
Nodes (33): description, devDependencies, react, react-dom, @types/react, @types/react-dom, typescript, exports (+25 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (20): devDependencies, @changesets/cli, eslint, @eslint/js, typescript-eslint, license, name, private (+12 more)

### Community 4 - "REPO SECTIONS"
Cohesion: 0.14
Nodes (13): 1. platform (first), 2. admin, 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos), 7. checkers-gym-management  (TO BE UPDATED: scope still open, revisit after admin works), 8. gokul-omni-converter  (TO BE UPDATED: standalone, not part of the web platform) (+5 more)

### Community 5 - "tokens.test.mjs"
Cohesion: 0.08
Nodes (18): packages_auth_dist_index, packages_auth_dist_index_getuserroles, packages_auth_dist_index_hasrole, packages_auth_dist_index_issuperadmin, gspaceAdmin, gymMember, superAdmin, packages_config_dist_index_appids (+10 more)

### Community 6 - "config.json"
Cohesion: 0.18
Nodes (10): access, baseBranch, changelog, commit, fixed, format, ignore, linked (+2 more)

### Community 7 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.20
Nodes (9): 🔄 Auto-Sync: Architecture Docs & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📦 This Repo: platform, 📉 Token-Optimized Communication Mode (+1 more)

### Community 8 - "components.test.mjs"
Cohesion: 0.09
Nodes (23): `@gokulsaraswat/ui` components, 0.1.0, @gokulsaraswat/ui, Minor Changes, packages_ui_dist_index, packages_ui_dist_index_footer, packages_ui_dist_index_footerpages, packages_ui_dist_index_legalpage (+15 more)

### Community 9 - "Kickoff prompt: platform"
Cohesion: 0.33
Nodes (5): 1. platform (first), COLLABORATOR ADD-ON, Kickoff prompt: platform, REPO SECTION, SHARED BLOCK

### Community 14 - "Footer.tsx"
Cohesion: 0.16
Nodes (15): FooterColumn, FooterLink, FooterProps, FooterSocial, isExternal(), packages_ui_src_footer_js, packages_ui_src_legalpage_js, LegalPageProps (+7 more)

### Community 15 - "ui/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

### Community 16 - "auth/package.json"
Cohesion: 0.07
Nodes (28): dependencies, @gokulsaraswat/config, description, devDependencies, @supabase/supabase-js, typescript, exports, files (+20 more)

### Community 17 - "auth/src/roles.ts"
Cohesion: 0.14
Nodes (18): CONTRACTS (master), Cross-repo contracts, `@gokulsaraswat/auth`, `@gokulsaraswat/ui` tokens, Hub `config.json`, Packages, Supabase `user_roles` (owner: admin repo creates the migration + RLS), getUserRoles() (+10 more)

### Community 18 - "config/package.json"
Cohesion: 0.08
Nodes (25): dependencies, zod, description, devDependencies, typescript, exports, files, typescript (+17 more)

### Community 19 - "config/src/index.ts"
Cohesion: 0.26
Nodes (13): `@gokulsaraswat/config`, AppId, appIds, HubConfig, hubConfigSchema, HubTile, parseHubConfig(), tileModes (+5 more)

### Community 20 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, declaration, jsx, module, moduleResolution, skipLibCheck, strict, target (+1 more)

### Community 21 - "auth/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

### Community 22 - "config/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

## Knowledge Gaps
- **193 isolated node(s):** `SHARED BLOCK`, `COLLABORATOR ADD-ON`, `1. platform (first)`, `Planning Chat: resume prompt`, `SHARED BLOCK` (+188 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 227 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CONTRACTS (master)` connect `auth/src/roles.ts` to `components.test.mjs`, `config/src/index.ts`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `Footer()` connect `components.test.mjs` to `Footer.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `@supabase/supabase-js` connect `auth/src/roles.ts` to `auth/package.json`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Footer()` (e.g. with ``@gokulsaraswat/ui` components` and `Minor Changes`) actually correct?**
  _`Footer()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `SHARED BLOCK`, `COLLABORATOR ADD-ON`, `1. platform (first)` to the rest of the system?**
  _193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `WORKLOG` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._