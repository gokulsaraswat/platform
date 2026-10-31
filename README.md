# platform

Shared packages and MASTER docs for the gokulsaraswat multi-repo platform
(admin, gokulmobilize, bestportofolio, Progress/GSpace, later Markdown-studio and checkers-gym-management).

## Status
`@gokulsaraswat/ui`: tokens + React Footer/LegalPage done (unpublished). Publishing v0.1 is next.
Live status: [WORKLOG.md](WORKLOG.md). All repos: [docs/WORKLOG.md](docs/WORKLOG.md).

## Layout
- `packages/ui`: `@gokulsaraswat/ui` (`tokens.css`, `tailwind.css`, `styles.css`, `Footer`, `LegalPage`). Planned: `mdx`, `auth`, `config`. API: [docs/CONTRACTS.md](docs/CONTRACTS.md).
- `docs/`: master docs: [WORKLOG](docs/WORKLOG.md), [CONTRACTS](docs/CONTRACTS.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [REPO-KIT](docs/REPO-KIT.md), [PROMPTS](docs/PROMPTS.md).
- `.changeset/`: versioning (Changesets).

## Commands
Requires Node 24+ and npm 11+.
```bash
npm install
```
```bash
npm run build
```
```bash
npm run lint
```
```bash
npm test
```
Root scripts run each workspace's script. `npm test` builds first.
Add a changeset for any published-package change:
```bash
npx changeset
```
Publishing arrives with the release workflow.

## Env vars
None. See [.env.example](.env.example).

## Contributing
Agents: start at [AGENTS.md](AGENTS.md). People: [COLLABORATORS.md](COLLABORATORS.md). License: all rights reserved ([LICENSE](LICENSE)).
