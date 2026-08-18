---
name: nuelink-cli-brands
description: List and paginate brands or retrieve brand IDs with nuelink-cli. Use for read-only brand discovery; if several brands match, require explicit target confirmation before a later mutation.
---

# Nuelink CLI Brands

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need brand IDs or a paged list before a later change.

```bash
nuelink-cli brands --per-page 25 --page 1
nuelink-cli --json brands --per-page 25 --page 1
```

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Primary reference: [manage workflow](../../skills/nuelink-cli-manage/references/manage-workflow.md)

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
