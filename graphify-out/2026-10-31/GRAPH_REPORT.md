# Graph Report - platform  (2026-10-31)

## Corpus Check
- 30 files · ~10,169 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .example 1)

## Summary
- 223 nodes · 242 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b8a320fe`
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
- Footer
- Kickoff prompt: platform
- pull_request_template.md
- .changeset/README.md
- PLANNING-CHAT-PROMPT.md
- SECURITY.md
- Footer.tsx
- compilerOptions
- devDependencies
- CONTRACTS (master)

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 16 edges
2. `compilerOptions` - 11 edges
3. `Footer()` - 10 edges
4. `🤖 System Architecture & Co-Worker Protocol` - 9 edges
5. `REPO SECTIONS` - 9 edges
6. `LegalPage()` - 8 edges
7. `scripts` - 7 edges
8. `WORKLOG: platform` - 7 edges
9. `platform` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- ``@gokulsaraswat/ui` components` --references--> `Footer()`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/Footer.tsx
- ``@gokulsaraswat/ui` components` --references--> `LegalPage()`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/LegalPage.tsx
- ``@gokulsaraswat/ui` components` --references--> `LinkProps`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx
- ``@gokulsaraswat/ui` components` --references--> `LinkComponent`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx
- `Session log` --references--> `Footer()`  [INFERRED]
  docs/WORKLOG.md → packages/ui/src/Footer.tsx

## Import Cycles
- None detected.

## Communities (18 total, 4 thin omitted)

### Community 0 - "README.md"
Cohesion: 0.15
Nodes (7): AGENTS.md: platform, COLLABORATORS: platform, Architecture: platform, Definition of done (any step), Master docs (live in `platform/docs/`), Repo Kit (every repo must have these), Shared constants (from `@gokulsaraswat/ui`, same on every app)

### Community 1 - "WORKLOG"
Cohesion: 0.11
Nodes (19): Agreed order, Architecture (agreed 2026-10-31), Current focus, Decisions, Dropped, Far later, Findings: bestportofolio (read-only, 2026-10-31), Gmobilize hub design (PROPOSED 2026-10-31, stack not final) (+11 more)

### Community 2 - "ui/package.json"
Cohesion: 0.07
Nodes (27): description, exports, ./styles.css, ./tailwind.css, ./tokens.css, files, license, name (+19 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (20): devDependencies, @changesets/cli, eslint, @eslint/js, typescript-eslint, license, name, private (+12 more)

### Community 4 - "REPO SECTIONS"
Cohesion: 0.15
Nodes (12): 1. platform (first), 2. admin, 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos), 7. checkers-gym-management  (TO BE UPDATED: scope still open, revisit after admin works), 8. gokul-omni-converter  (TO BE UPDATED: standalone, not part of the web platform) (+4 more)

### Community 5 - "tokens.test.mjs"
Cohesion: 0.10
Nodes (15): packages_ui_dist_index, packages_ui_dist_index_footer, packages_ui_dist_index_footerpages, packages_ui_dist_index_legalpage, packages_ui_dist_index_pagepath, dark, external, root (+7 more)

### Community 6 - "config.json"
Cohesion: 0.18
Nodes (10): access, baseBranch, changelog, commit, fixed, format, ignore, linked (+2 more)

### Community 7 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.20
Nodes (9): 🔄 Auto-Sync: Architecture Docs & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📦 This Repo: platform, 📉 Token-Optimized Communication Mode (+1 more)

### Community 8 - "Footer"
Cohesion: 0.11
Nodes (20): Session log, 0.1.0, @gokulsaraswat/ui, Minor Changes, Footer(), isExternal(), LegalPage(), Commands (+12 more)

### Community 9 - "Kickoff prompt: platform"
Cohesion: 0.33
Nodes (5): 1. platform (first), COLLABORATOR ADD-ON, Kickoff prompt: platform, REPO SECTION, SHARED BLOCK

### Community 14 - "Footer.tsx"
Cohesion: 0.18
Nodes (14): FooterColumn, FooterLink, FooterProps, FooterSocial, packages_ui_src_footer_js, packages_ui_src_legalpage_js, LegalPageProps, packages_ui_src_link_js (+6 more)

### Community 15 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, declaration, jsx, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 16 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, react, react-dom, @types/react, @types/react-dom, typescript

### Community 17 - "CONTRACTS (master)"
Cohesion: 0.20
Nodes (8): CONTRACTS (master), Cross-repo contracts, `@gokulsaraswat/ui` components, `@gokulsaraswat/ui` tokens, Packages, LinkComponent, LinkProps, react

## Knowledge Gaps
- **132 isolated node(s):** `$schema`, `baseBranch`, `access`, `format`, `changelog` (+127 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 155 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Footer()` connect `Footer` to `CONTRACTS (master)`, `tokens.test.mjs`, `Footer.tsx`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `react` connect `CONTRACTS (master)` to `ui/package.json`, `tokens.test.mjs`, `Footer.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `platform` connect `Footer` to `README.md`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Footer()` (e.g. with ``@gokulsaraswat/ui` components` and `Session log`) actually correct?**
  _`Footer()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `baseBranch`, `access` to the rest of the system?**
  _132 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `WORKLOG` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._