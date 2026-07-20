# Contributing

Thanks for contributing to this repository.

## Development Setup

- Install Node.js 20+.
- Clone the repository.
- Run:

```bash
npm run validate
```

## Adding Or Updating A Skill

- Create or update `skills/<skill-name>/SKILL.md`.
- Include YAML frontmatter at the top:

```yaml
---
name: my-skill-name
description: Short description of the skill.
---
```

- Ensure exactly one H1 heading exists.
- Add trigger-focused metadata (for example: `triggers`, `boundaries`, `safety`) when relevant.
- Prefer executable, copy-ready command examples.
- Avoid embedding secrets, API keys, or private URLs.
- Keep runtime references self-contained under `skills/<skill>/references/`.
- For mutation skills, include a confirmation workflow and safe defaults.

## Validation

- Run `npm run validate` before opening a pull request.
- CI must pass for skill metadata and Markdown quality checks.

## Pull Request Checklist

- [ ] Scope is focused and documented
- [ ] Skills remain consistent with CLI behavior
- [ ] Validation passes locally
- [ ] Markdown formatting is clean
