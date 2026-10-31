# Architecture: platform

Only what exists. Updated: 2026-10-31.

```
platform/                 npm workspace root (private, not published)
├── docs/                 MASTER docs for all repos (WORKLOG, CONTRACTS, REPO-KIT, PROMPTS)
├── packages/             workspace packages (none yet)
└── .changeset/           Changesets config (versioning + changelogs)
```

Planned (not built): `packages/ui`, `packages/mdx`, `packages/auth`, `packages/config`, published to GitHub Packages by CI on `main`.
