# Nuelink CLI Skills

This directory contains reusable skills for common Nuelink CLI workflows.

## Skills Catalog

- `nuelink-cli-install-auth`: Install CLI and configure authentication.
- `nuelink-cli-profile`: Validate and inspect the authenticated identity.
- `nuelink-cli-brands`: List brands with pagination and JSON mode.
- `nuelink-cli-collections`: List and create collections.
- `nuelink-cli-automations`: List and create automations.
- `nuelink-cli-channels`: List channels for a brand.
- `nuelink-cli-media`: List and upload media files.
- `nuelink-cli-posts`: List and create posts with JSON payload or flags.
- `nuelink-cli-ops`: Operational patterns for JSON output, timeouts, and troubleshooting.

## Standard Conventions

- Configure auth before running resource commands.
- Use `--json` for machine-readable automation and CI pipelines.
- Keep secrets in environment variables, not in command history or files.
- Use explicit pagination (`--per-page`, `--page`) in scripts for deterministic behavior.

## Authoring Rules

- Every skill lives at `skills/<name>/SKILL.md`.
- Every skill starts with YAML frontmatter including `name` and `description`.
- Frontmatter `name` must match folder name.
- Include one clear H1 heading and practical command examples.

## Validation

Run from repository root:

```bash
npm run validate
```

## Examples Directory

- Shared API request/response examples are in `examples/`.
- Skill files reference the relevant JSON under `examples/<domain>/`.
