---
name: nuelink-cli-brands
description: Use when a user asks to list brands, paginate brand results, or retrieve brand IDs.
triggers: list brands, find brand id, paginate brands, show brands as json
boundaries: Read-only brand listing; do not create or modify resources.
safety: If multiple brand matches are possible, require explicit user confirmation of target brand before mutation workflows.
---

# Nuelink CLI Brands

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Reference: `../nuelink-cli-manage/references/manage-workflow.md`

Use this skill to list brands and page through results.

Reference: `./references/brand-discovery.md`

## Commands

Table output:

```bash
nuelink-cli brands --per-page 25 --page 1
```

Raw JSON output:

```bash
nuelink-cli --json brands --per-page 25 --page 1
```

## Expected API Result

- Endpoint: `GET /api/public/v1/brands?per_page=<n>&page=<n>`
- Success code: `200`
- Example response: `examples/brands/list.response.json`

## Tips

- Use `--json` for scripts and CI parsing.
- Increase `--per-page` when reducing API round trips matters.
