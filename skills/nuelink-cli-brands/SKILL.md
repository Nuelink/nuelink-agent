---
name: nuelink-cli-brands
description: List brands with pagination and optional JSON output.
---

# Nuelink CLI Brands

Use this skill to list brands and page through results.

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
