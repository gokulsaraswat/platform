# Graph Report - platform  (2026-11-24)

## Corpus Check
- 63 files · ~36,101 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 2, .example 1)

## Summary
- 582 nodes · 633 edges · 38 communities (32 shown, 6 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `155dcada`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- REPO SECTIONS
- WORKLOG
- ui/package.json
- package.json
- Cancellation — Temporal Workflow
- tokens.test.mjs
- config.json
- 🤖 System Architecture & Co-Worker Protocol
- 5.20.3 Trip Data Model Changes
- Kickoff prompt: platform
- pull_request_template.md
- .changeset/README.md
- PLANNING-CHAT-PROMPT.md
- SECURITY.md
- components.test.mjs
- ui/tsconfig.json
- auth/package.json
- auth/src/roles.ts
- config/package.json
- config/src/index.ts
- compilerOptions
- auth/tsconfig.json
- config/tsconfig.json
- CONTEXT: read this first in every new session
- LLD — Project Repository Initial Setup & Architecture
- LLD — System Flows & Diagrammatic Specifications
- 1.4 Mermaid — Cancellation Sequence Diagrams
- Ideas: One Platform, Many Apps
- REPO SECTIONS
- Supply Cancellation Execute — Success / Failure Event Flow
- CX Cancellation Flow
- 6.6 Refund Quote Entity
- Prompt Playbook — CLAUDE.md Workflow
- 🤖 System Architecture & Co-Worker Protocol
- Repo Kit (every repo must have these)
- sync-architecture.sh
- COLLABORATOR-DESIGN-CHAT-PROMPT.md
- prompts/PLANNING-CHAT-PROMPT.md

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 20 edges
2. `Ideas: One Platform, Many Apps` - 14 edges
3. `🤖 System Architecture & Co-Worker Protocol` - 11 edges
4. `Cancellation — Temporal Workflow` - 10 edges
5. `LLD — Project Repository Initial Setup & Architecture` - 10 edges
6. `REPO SECTIONS` - 9 edges
7. `Footer()` - 9 edges
8. `parseHubConfig()` - 9 edges
9. `REPO SECTIONS` - 9 edges
10. `compilerOptions` - 9 edges

## Surprising Connections (you probably didn't know these)
- `2. admin` --references--> `parseHubConfig()`  [INFERRED]
  Not Repository/prompts/PROMPTS.md → packages/config/src/hub.ts
- ``@gokulsaraswat/config`` --references--> `UserRole`  [INFERRED]
  docs/CONTRACTS.md → packages/config/src/roles.ts
- ``@gokulsaraswat/ui` components` --references--> `LinkComponent`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx
- ``@gokulsaraswat/ui` components` --references--> `LinkProps`  [INFERRED]
  docs/CONTRACTS.md → packages/ui/src/link.tsx
- `Hub `config.json`` --references--> `parseHubConfig()`  [INFERRED]
  docs/CONTRACTS.md → packages/config/src/hub.ts

## Import Cycles
- None detected.

## Communities (38 total, 6 thin omitted)

### Community 0 - "REPO SECTIONS"
Cohesion: 0.06
Nodes (25): AGENTS.md: platform, COLLABORATORS: platform, Architecture: platform, 1. platform (first), 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos) (+17 more)

### Community 1 - "WORKLOG"
Cohesion: 0.07
Nodes (27): Agreed order, Architecture (agreed 2026-10-31), Cleanup scan: `/cleanscan` (Claude slash command), Commit + push everything: `/gitmd` (Claude slash command), Current focus, Decisions, Dropped, Far later (+19 more)

### Community 2 - "ui/package.json"
Cohesion: 0.06
Nodes (33): description, devDependencies, react, react-dom, @types/react, @types/react-dom, typescript, exports (+25 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (20): devDependencies, @changesets/cli, eslint, @eslint/js, typescript-eslint, license, name, private (+12 more)

### Community 4 - "Cancellation — Temporal Workflow"
Cohesion: 0.07
Nodes (29): 1.1 Purpose, 1.2 Key design decisions, 1.3 Workflow settings, 1. Overview, 2.1 Three-phase flow, 2.2 Multi-pod signal routing, 2. Architecture, 3.1 Step sequence (+21 more)

### Community 5 - "tokens.test.mjs"
Cohesion: 0.07
Nodes (20): packages_auth_dist_index, packages_auth_dist_index_getuserroles, packages_auth_dist_index_hasrole, packages_auth_dist_index_issuperadmin, gspaceAdmin, gymMember, superAdmin, packages_config_dist_index_all_apps (+12 more)

### Community 6 - "config.json"
Cohesion: 0.18
Nodes (10): access, baseBranch, changelog, commit, fixed, format, ignore, linked (+2 more)

### Community 7 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.17
Nodes (11): 🔄 Auto-Sync: Architecture Docs & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), Context, 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), STANDING RULES (from Gokul, apply in every session), 🤖 System Architecture & Co-Worker Protocol (+3 more)

### Community 8 - "5.20.3 Trip Data Model Changes"
Cohesion: 0.07
Nodes (26): 5.20.1 Overview, 5.20.2.1 Overview, 5.20.2.2 Segment entries, 5.20.2.3 Ancillary entries, 5.20.2.4 Sample hold response (abbreviated), 5.20.2.5 Key principles, 5.20.2 Hold Response Changes, 5.20.3.1 Overview (+18 more)

### Community 9 - "Kickoff prompt: platform"
Cohesion: 0.33
Nodes (5): 1. platform (first), COLLABORATOR ADD-ON, Kickoff prompt: platform, REPO SECTION, SHARED BLOCK

### Community 14 - "components.test.mjs"
Cohesion: 0.06
Nodes (38): `@gokulsaraswat/ui` components, 0.1.0, @gokulsaraswat/ui, Minor Changes, packages_ui_dist_index, packages_ui_dist_index_footer, packages_ui_dist_index_footerpages, packages_ui_dist_index_legalpage (+30 more)

### Community 15 - "ui/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

### Community 16 - "auth/package.json"
Cohesion: 0.07
Nodes (28): dependencies, @gokulsaraswat/config, description, devDependencies, @supabase/supabase-js, typescript, exports, files (+20 more)

### Community 17 - "auth/src/roles.ts"
Cohesion: 0.13
Nodes (21): CONTRACTS (master), `@gokulsaraswat/auth`, `@gokulsaraswat/ui` tokens, Packages, 0.1.0, @gokulsaraswat/auth, Minor Changes, Patch Changes (+13 more)

### Community 18 - "config/package.json"
Cohesion: 0.08
Nodes (24): dependencies, zod, description, devDependencies, typescript, exports, files, typescript (+16 more)

### Community 19 - "config/src/index.ts"
Cohesion: 0.16
Nodes (19): Cross-repo contracts, `@gokulsaraswat/config`, Hub `config.json`, Supabase `user_roles` (owner: admin repo creates the migration + RLS), 2. admin, Process (decided 2026-10-31), 2. admin, AppId (+11 more)

### Community 20 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, declaration, jsx, module, moduleResolution, skipLibCheck, strict, target (+1 more)

### Community 21 - "auth/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

### Community 22 - "config/tsconfig.json"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, rootDir, extends, include, ../../tsconfig.base.json

### Community 23 - "CONTEXT: read this first in every new session"
Cohesion: 0.20
Nodes (9): CONTEXT: read this first in every new session, Future changes (expect these; do not block them), How repos interact (the contracts), Repo map, STANDING RULES (from Gokul, apply in every session), This repo: platform, Vision, Work modes (ask Gokul which one if unclear) (+1 more)

### Community 24 - "LLD — Project Repository Initial Setup & Architecture"
Cohesion: 0.08
Nodes (24): 1.1 Purpose, 1.2 Tech Stack, 1.3 High-Level System Context, 1. Executive Summary & Tech Stack, 2.1 Gradle Multi-Module Layout, 2.2 Package Tree (ASCII), 2.3 Module Responsibilities, 2. Directory & Module Structure (+16 more)

### Community 25 - "LLD — System Flows & Diagrammatic Specifications"
Cohesion: 0.10
Nodes (19): 2.1 Scope, 2.2 Triggers, 2.3 Functional Breakdown (Low-Level), 2.4 Mermaid — Refund Sequence (Primary Path), 2.5 Mermaid — Manual Refund Sequence (§5.13), 2. Post-Booking Refund Flow, 3.1 Mermaid Class Diagram, 3.2 Dependency Rules (Class Level) (+11 more)

### Community 26 - "1.4 Mermaid — Cancellation Sequence Diagrams"
Cohesion: 0.11
Nodes (18): 1.1 Scope, 1.2 Actors & Boundaries, 1.3 Functional Breakdown (Low-Level), 1.4.1 Discovery, 1.4.2 Quote, 1.4.3 Execute, 1.4.4 Callback & Workflow Completion, 1.4.5 Status Poll (+10 more)

### Community 27 - "Ideas: One Platform, Many Apps"
Cohesion: 0.13
Nodes (14): 10. Open questions, 11. Excellidraw opensource, 1. Vision, 2. Current state (checked in repos), 3. Framework, 4. Content & CMS, 5. Roles (super admin → app admins), 6. Shared packages (so "every component works everywhere") (+6 more)

### Community 28 - "REPO SECTIONS"
Cohesion: 0.15
Nodes (12): 1. platform (first), 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos), 7. checkers-gym-management  (TO BE UPDATED: scope still open, revisit after admin works), 8. gokul-omni-converter  (TO BE UPDATED: standalone, not part of the web platform), CLEANUP REVIEW PROMPT (token-light, optional) (+4 more)

### Community 29 - "Supply Cancellation Execute — Success / Failure Event Flow"
Cohesion: 0.18
Nodes (10): 1. Overview, 2. Actors, 3. Success Path, 4.1 Agent Action (Manual Queue), 4. Failure Path, 5. Flow Diagram, 6. Notes, ASCII (+2 more)

### Community 30 - "CX Cancellation Flow"
Cohesion: 0.22
Nodes (8): Actors, CX Cancellation Flow, Flowchart, Notes, Open Issue — `quote_id` on Execute, Phase 1 — Cancel Discovery (via Trips), Phase 2 — Refund Discovery (Quote), Phase 3 — Cancellation Execute

### Community 31 - "6.6 Refund Quote Entity"
Cohesion: 0.22
Nodes (8): 6.6 Refund Quote Entity, 6.6 Refund Quote Entity (Redis), Design principles, Field reference, Penalty fields, Quote API vs Redis (example), Redis JSON, Relationship to §6.5 Snapshot

### Community 32 - "Prompt Playbook — CLAUDE.md Workflow"
Cohesion: 0.25
Nodes (7): 1. Starting a New Folder / Project, 2. Starting with an Existing Project, 3. The "After-Command" Chaser, 4. Start / Debug Prompt Template, 5. Session Wrap-Up Prompt Template, 6. The Context Recovery Prompt (Anti-Hallucination Trigger), Prompt Playbook — CLAUDE.md Workflow

### Community 33 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.29
Nodes (6): ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📉 Token-Optimized Communication Mode

### Community 34 - "Repo Kit (every repo must have these)"
Cohesion: 0.33
Nodes (5): Definition of done (any step), Deploy-ready rules (every repo), Master docs (live in `platform/docs/`), Repo Kit (every repo must have these), Shared constants (from `@gokulsaraswat/ui`, same on every app)

### Community 35 - "sync-architecture.sh"
Cohesion: 0.70
Nodes (3): edge(), node(), sync-architecture.sh script

## Knowledge Gaps
- **358 isolated node(s):** `1. Starting a New Folder / Project`, `2. Starting with an Existing Project`, `3. The "After-Command" Chaser`, `4. Start / Debug Prompt Template`, `5. Session Wrap-Up Prompt Template` (+353 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 410 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `parseHubConfig()` connect `config/src/index.ts` to `auth/src/roles.ts`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `CONTRACTS (master)` connect `auth/src/roles.ts` to `config/src/index.ts`, `components.test.mjs`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `1. Starting a New Folder / Project`, `2. Starting with an Existing Project`, `3. The "After-Command" Chaser` to the rest of the system?**
  _358 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `REPO SECTIONS` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `WORKLOG` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._