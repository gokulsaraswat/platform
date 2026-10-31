# platform

Shared packages and MASTER docs for the gokulsaraswat multi-repo platform
(admin, gokulmobilize, bestportofolio, Progress/GSpace, later Markdown-studio and checkers-gym-management).

## Status
Repo kit and workspace root only. No packages yet; `@gokulsaraswat/ui` v0.1 (tokens + footer) is next.
Live status: [WORKLOG.md](WORKLOG.md). All repos: [docs/WORKLOG.md](docs/WORKLOG.md).

## Layout
- `packages/*`: npm workspace packages (planned: `ui`, `mdx`, `auth`, `config`, scope `@gokulsaraswat`).
- `docs/`: master docs: [WORKLOG](docs/WORKLOG.md), [CONTRACTS](docs/CONTRACTS.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [REPO-KIT](docs/REPO-KIT.md), [PROMPTS](docs/PROMPTS.md).
- `.changeset/`: versioning (Changesets).

## Commands
Requires Node 24+ and npm 11+.
```bash
npm install
```
```bash
npx changeset
```
Build, lint, test and publish commands arrive with the first package.

## Env vars
None. See [.env.example](.env.example).

## Contributing
Agents: start at [AGENTS.md](AGENTS.md). People: [COLLABORATORS.md](COLLABORATORS.md). License: all rights reserved ([LICENSE](LICENSE)).
