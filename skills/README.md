# Nuelink CLI Skills

This directory contains reusable skills for common Nuelink CLI workflows.

## How To Use

Start with the smallest skill that matches the task, then follow the examples inside that skill.

- Install or verify access: [nuelink-cli-setup/SKILL.md](nuelink-cli-setup/SKILL.md)
- List brands, channels, collections, automations, or media, then create safely: [nuelink-cli-manage/SKILL.md](nuelink-cli-manage/SKILL.md)
- Upload media or publish posts: [nuelink-cli-publish/SKILL.md](nuelink-cli-publish/SKILL.md)

Compatibility aliases still work, but they only point back to the canonical skills.

## Canonical Skills

- `nuelink-cli-setup`: install, auth, identity checks, and setup diagnostics.
- `nuelink-cli-manage`: brands, channels, collections, automations, and media inventory flows.
- `nuelink-cli-publish`: upload media, draft/queue/schedule/publish posts, and post listing.

## Simple Flow

1. Run `nuelink-cli auth:status`.
2. Use a read-only command to find the target ID.
3. Run the create command with `--dry-run`.
4. Confirm the result before repeating without `--dry-run`.

## Compatibility Aliases

The original 9 skill folders are retained for backward compatibility and route users to the canonical skills above.

Each skill contains:

- Trigger-oriented frontmatter for better skill routing.
- Scope boundaries clarifying what the skill should not do.
- Safety guidance for credentials, IDs, and mutations.
- Self-contained references in `references/*.md`.

## Standard Conventions

- Configure auth before running resource commands.
- Use `--json` for machine-readable automation and CI pipelines.
- Keep secrets in environment variables, not in command history or files.
- Use explicit pagination (`--per-page`, `--page`) in scripts for deterministic behavior.
- Resolve target IDs before mutation commands.
- Use `DRAFT` as the default when publish intent is ambiguous.
- Require explicit confirmation for non-draft publishing and other create operations.

## Authoring Rules

- Every skill lives at `skills/<name>/SKILL.md`.
- Every skill starts with YAML frontmatter including `name` and `description`.
- Frontmatter `name` must match folder name.
- Include one clear H1 heading and practical command examples.
- Keep references local to the skill folder under `references/`.

## Validation

Run from repository root:

```bash
npm run validate
npm run validate:behavior
```

## Shared Examples Directory

- Repository-level request/response examples remain in `examples/`.
- Skill runtime references should remain local in each skill `references/` directory.
