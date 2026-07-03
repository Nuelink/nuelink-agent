---
name: nuelink-cli-channels
description: List channels for a specific brand.
---

# Nuelink CLI Channels

Use this skill to retrieve channels for a brand.

## Commands

Table output:

```bash
nuelink-cli channels --brand-id 13493 --per-page 25 --page 1
```

JSON output:

```bash
nuelink-cli --json channels --brand-id 13493 --per-page 25 --page 1
```

## Expected API Result

- Endpoint: `GET /api/public/v1/brands/:brand_id/channels?per_page=<n>&page=<n>`
- Success code: `200`
- Example response: `examples/channels/list.response.json`

## Notes

- `--brand-id` is required.
- Use pagination flags for large channel sets.
