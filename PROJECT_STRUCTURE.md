# Project Structure

Overview of what each top-level folder and file is responsible for.

## Tree

```text
.
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- examples/
|   |-- README.md
|   `-- <domain>/*.json
|-- scripts/
|   `-- validate-skills.mjs
|-- skills/
|   |-- README.md
|   `-- <skill-name>/SKILL.md
|-- CHANGELOG.md
|-- CONTRIBUTING.md
|-- LICENSE
|-- package.json
|-- QUICK_START.md
|-- PROJECT_STRUCTURE.md
|-- API_ENDPOINTS.md
|-- README.md
`-- SECURITY.md
```

## Notes

- `skills/` is the main product: each skill is one focused workflow.
- `examples/` contains sanitized request/response JSON used by skills.
- `scripts/validate-skills.mjs` enforces metadata and structure consistency.
- CI runs markdown lint and skill validation on pull requests.
