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
|-- agents/
|   `-- openai.yaml
|-- scripts/
|   `-- validate-skills.mjs
|   `-- validate-behavior.mjs
|-- tests/
|   `-- behavior/
|       `-- fixtures.json
|-- skills/
|   |-- README.md
|   `-- <skill-name>/
|       |-- SKILL.md
|       `-- references/*.md
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

- `skills/` contains canonical and legacy alias skills.
- Canonical skills are `nuelink-cli-setup`, `nuelink-cli-manage`, and `nuelink-cli-publish`.
- `skills/<skill>/references/` keeps each installed skill self-contained.
- `examples/` contains sanitized request/response JSON used by skills.
- `.codex-plugin/plugin.json` and `.claude-plugin/plugin.json` are the native Codex and Claude Code manifests; `.mcp.json` connects the remote Nuelink MCP server.
- `compatibility-skills/` is an opt-in migration bundle for the nine legacy aliases.
- `scripts/validate-skills.mjs` enforces metadata and structure consistency.
- `scripts/validate-behavior.mjs` enforces safety and routing behavior expectations.
- CI runs markdown lint, skill validation, and behavior validation on pull requests.
