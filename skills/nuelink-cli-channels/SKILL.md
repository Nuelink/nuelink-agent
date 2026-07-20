---
name: nuelink-cli-channels
description: Use when a user asks to list channels under a brand or map channel IDs for posting workflows.
triggers: list channels, find channel id, collection channel mapping, posting destinations
boundaries: Read-only channel discovery only.
safety: Confirm one target brand before channel listing if request is ambiguous.
---

# Nuelink CLI Channels

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Reference: `../nuelink-cli-manage/references/manage-workflow.md`

Use this skill to retrieve channels for a brand.

Reference: `./references/channel-discovery.md`

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
