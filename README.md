# Nuelink Agent Skills

Agent skills and examples for working with the Nuelink CLI.

This repo packages practical, copy-paste workflows for auth, brands, collections, automations, channels, media, and posts.

## Install As A Skill

```bash
npx skills add kreatinc/nuelink-agent
```

## What You Get

- Focused skill docs under [skills/README.md](skills/README.md)
- Request/response examples under [examples/README.md](examples/README.md)
- Local validation via [scripts/validate-skills.mjs](scripts/validate-skills.mjs)
- CI checks for markdown and skill structure

## Quick Start

1. Install and authenticate the CLI:

```bash
npm install -g @nuelink/nuelink-cli
nuelink-cli --auth YOUR_API_KEY
nuelink-cli auth:status
```

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

- `nuelink-cli-install-auth`: install and auth setup
- `nuelink-cli-profile`: profile checks (`me`)
- `nuelink-cli-brands`: list brands
- `nuelink-cli-collections`: list/create collections
- `nuelink-cli-automations`: list/create automations
- `nuelink-cli-channels`: list channels
- `nuelink-cli-media`: list/upload media
- `nuelink-cli-posts`: list/create posts
- `nuelink-cli-ops`: JSON mode, timeout, troubleshooting

## Examples

Examples are grouped by domain in [examples/](examples) and use placeholder tokens.

- Brand list response: [examples/brands/list.response.json](examples/brands/list.response.json)
- Collection create payload: [examples/collections/create.request.json](examples/collections/create.request.json)
- Automation create payload: [examples/automations/create.request.json](examples/automations/create.request.json)
- Post create payload: [examples/posts/create.request.json](examples/posts/create.request.json)

## Local Checks

```bash
npm run lint:md
npm run validate
```

## Repository Layout

```text
.
|-- .github/workflows/ci.yml
|-- examples/
|-- skills/
|-- scripts/validate-skills.mjs
|-- CLI-README.md
|-- CONTRIBUTING.md
|-- SECURITY.md
`-- package.json
```

## Related Docs

- CLI reference: [CLI-README.md](CLI-README.md)
- Skills index: [skills/README.md](skills/README.md)
- Contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## License

MIT. See [LICENSE](LICENSE).
