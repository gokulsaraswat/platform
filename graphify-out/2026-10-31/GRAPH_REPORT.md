# Graph Report - platform  (2026-10-31)

## Corpus Check
- 20 files · ~8,180 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 147 nodes · 136 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6638a53c`
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
- WORKLOG: platform
- Kickoff prompt: platform
- pull_request_template.md
- .changeset/README.md
- PLANNING-CHAT-PROMPT.md
- SECURITY.md

## God Nodes (most connected - your core abstractions)
1. `WORKLOG` - 16 edges
2. `🤖 System Architecture & Co-Worker Protocol` - 9 edges
3. `REPO SECTIONS` - 9 edges
4. `scripts` - 7 edges
5. `WORKLOG: platform` - 7 edges
6. `platform` - 6 edges
7. `To-do` - 5 edges
8. `repository` - 4 edges
9. `Kickoff prompt: platform` - 4 edges
10. `Kickoff Prompts` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 4 thin omitted)

### Community 0 - "README.md"
Cohesion: 0.09
Nodes (16): AGENTS.md: platform, COLLABORATORS: platform, Architecture: platform, CONTRACTS (master), Cross-repo contracts, Packages, Definition of done (any step), Master docs (live in `platform/docs/`) (+8 more)

### Community 1 - "WORKLOG"
Cohesion: 0.10
Nodes (20): Agreed order, Architecture (agreed 2026-10-31), Current focus, Decisions, Dropped, Far later, Findings: bestportofolio (read-only, 2026-10-31), Gmobilize hub design (PROPOSED 2026-10-31, stack not final) (+12 more)

### Community 2 - "ui/package.json"
Cohesion: 0.11
Nodes (18): description, exports, ./tailwind.css, ./tokens.css, files, license, name, publishConfig (+10 more)

### Community 3 - "package.json"
Cohesion: 0.13
Nodes (14): devDependencies, @changesets/cli, license, name, private, scripts, build, changeset (+6 more)

### Community 4 - "REPO SECTIONS"
Cohesion: 0.15
Nodes (12): 1. platform (first), 2. admin, 3. gokulmobilize, 4. bestportofolio, 5. Progress (GSpace), 6. Markdown-studio  (TO BE UPDATED: scope still open, revisit after the first 5 repos), 7. checkers-gym-management  (TO BE UPDATED: scope still open, revisit after admin works), 8. gokul-omni-converter  (TO BE UPDATED: standalone, not part of the web platform) (+4 more)

### Community 5 - "tokens.test.mjs"
Cohesion: 0.15
Nodes (8): dark, external, root, tailwind, tokens, ref_node_assert, ref_node_fs, ref_node_test

### Community 6 - "config.json"
Cohesion: 0.18
Nodes (10): access, baseBranch, changelog, commit, fixed, format, ignore, linked (+2 more)

### Community 7 - "🤖 System Architecture & Co-Worker Protocol"
Cohesion: 0.20
Nodes (9): 🔄 Auto-Sync: Architecture Docs & Graphify, ⏱️ Communication Constraints (Zero Waste Mode), 📐 Engineering Guardrails, 🎨 Frontend Architecture, UI/UX & Motion Standard, 🛠️ Project Execution Modes (Personal vs. Organization), 🤖 System Architecture & Co-Worker Protocol, 📦 This Repo: platform, 📉 Token-Optimized Communication Mode (+1 more)

### Community 8 - "WORKLOG: platform"
Cohesion: 0.25
Nodes (7): Blockers / requests to other repos, Current state (2026-10-31), Decisions (2026-10-31), Done, In progress / next, Reminders, WORKLOG: platform

### Community 9 - "Kickoff prompt: platform"
Cohesion: 0.33
Nodes (5): 1. platform (first), COLLABORATOR ADD-ON, Kickoff prompt: platform, REPO SECTION, SHARED BLOCK

## Knowledge Gaps
- **104 isolated node(s):** `$schema`, `baseBranch`, `access`, `format`, `changelog` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 116 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `WORKLOG` connect `WORKLOG` to `README.md`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **What connects `$schema`, `baseBranch`, `access` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `WORKLOG` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `ui/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._