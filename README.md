# Nuelink Agent Skills

Production-ready skill pack for Nuelink CLI workflows.

This repository contains reusable skill documents that guide consistent, automation-friendly use of the `nuelink-cli` across local development and CI.

## What Is Included

- Skill docs under `skills/` for install/auth, profile, brands, collections, automations, channels, media, posts, and operations.
- API request/response examples under `examples/`, based on the Postman collection.
- A validation script that checks skill metadata and structure.
- CI workflow to validate skills and lint Markdown on every pull request.

## Repository Structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- examples/
|   |-- brands/
|   |-- collections/
|   |-- posts/
|   `-- ...
|-- scripts/
|   `-- validate-skills.mjs
|-- skills/
|   |-- README.md
|   |-- nuelink-cli-install-auth/
|   |   `-- SKILL.md
|   `-- ...
|-- CONTRIBUTING.md
|-- SECURITY.md
`-- package.json
```

## Quick Start

- Review available skills in `skills/README.md`.
- Run local validation:

```bash
npm run validate
```

- Optionally run Markdown lint locally:

```bash
npm run lint:md
```

## Quality Gates

- Each skill must have YAML frontmatter with `name` and `description`.
- Skill `name` must match its folder name.
- Each skill must include an H1 heading.
- CI enforces validation and Markdown linting.

## Versioning And Releases

- Use semantic versioning tags for published snapshots.
- Keep changes to skills backward-compatible when possible.
- Document notable changes in pull request descriptions.

## License

This repository is licensed under the MIT License. See `LICENSE`.
