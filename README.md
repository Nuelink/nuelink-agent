# Nuelink Agent Skills

Agent skills and examples for working with the Nuelink CLI.

This repo packages practical, copy-paste workflows for auth, brands, collections, automations, channels, media, and posts.

## Install As Skills

Ecosystem installer:

```bash
npx skills add kreatinc/nuelink-agent
```

Native local locations (Codex/OpenAI agent runtime):

- Repository scoped: `.agents/skills/`
- User scoped: `$HOME/.agents/skills/`

Only install skills from repositories you trust. Skills are executable instructions.

## What You Get

- Focused skill docs under [skills/README.md](skills/README.md)
- Request/response examples under [examples/README.md](examples/README.md)
- Self-contained skill references under `skills/<skill>/references/`
- Local validation via [scripts/validate-skills.mjs](scripts/validate-skills.mjs)
- Behavioral validation via [scripts/validate-behavior.mjs](scripts/validate-behavior.mjs)
- CI checks for markdown and skill structure

## Quick Start

1. Install and authenticate the CLI:

```bash
npm install -g @nuelink/nuelink-cli
nuelink-cli --auth YOUR_API_KEY
nuelink-cli auth:status
```

For CI, prefer `NUELINK_API_KEY` environment variable over saved local config.

1. Run a first call:

```bash
nuelink-cli me
```

1. Use a skill workflow, for example:

```bash
nuelink-cli brands --per-page 5 --page 1
nuelink-cli --json brands --per-page 5 --page 1
```

## Skill Coverage

Canonical skills:

- `nuelink-cli-setup`: install/auth/profile/ops readiness.
- `nuelink-cli-manage`: brands/channels/collections/automations/media management.
- `nuelink-cli-publish`: media upload and draft/queue/schedule/immediate post workflows.

Compatibility aliases (legacy 9-skill layout is retained):

- `nuelink-cli-install-auth`, `nuelink-cli-profile`, `nuelink-cli-ops` -> `nuelink-cli-setup`
- `nuelink-cli-brands`, `nuelink-cli-channels`, `nuelink-cli-collections`, `nuelink-cli-automations`, `nuelink-cli-media` -> `nuelink-cli-manage`
- `nuelink-cli-posts` -> `nuelink-cli-publish`

## Safety Defaults

- Resolve target brand and collection IDs before mutation commands.
- Preview command or payload before creating collections, automations, uploads, or posts.
- Treat ambiguous publishing intent as `DRAFT`.
- Require explicit user intent for `QUEUE`, `SCHEDULE`, and `IMMEDIATE` posting.

## Examples

Examples are grouped by domain in [examples/](examples) and use placeholder tokens.

Each skill also includes portable references under `skills/<skill>/references/` so installed skills remain self-contained.

- Brand list response: [examples/brands/list.response.json](examples/brands/list.response.json)
- Collection create payload: [examples/collections/create.request.json](examples/collections/create.request.json)
- Automation create payload: [examples/automations/create.request.json](examples/automations/create.request.json)
- Post create payload: [examples/posts/create.request.json](examples/posts/create.request.json)

## Local Checks

```bash
npm run lint:md
npm run validate
npm run validate:behavior
npm run validate:all
```

## Repository Layout

```text
.
|-- .github/workflows/ci.yml
|-- examples/
|-- skills/
|-- scripts/validate-skills.mjs
|-- scripts/validate-behavior.mjs
|-- tests/behavior/fixtures.json
|-- QUICK_START.md
|-- PROJECT_STRUCTURE.md
|-- API_ENDPOINTS.md
|-- CONTRIBUTING.md
|-- SECURITY.md
`-- package.json
```

## Related Docs

- Quick start: [QUICK_START.md](QUICK_START.md)
- Project structure: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- API endpoints: [API_ENDPOINTS.md](API_ENDPOINTS.md)
- Skills index: [skills/README.md](skills/README.md)
- Contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## License

MIT. See [LICENSE](LICENSE).
