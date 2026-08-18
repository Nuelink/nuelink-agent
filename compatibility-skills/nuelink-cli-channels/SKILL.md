---
name: nuelink-cli-channels
description: List channels under a brand or map channel IDs for posting workflows with nuelink-cli. Use for read-only channel discovery and confirm one target brand when the request is ambiguous.
---

# Nuelink CLI Channels

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need channels for one brand before publishing or assigning work.

```bash
nuelink-cli channels --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli --json channels --brand-id BRAND_ID --per-page 25 --page 1
```

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Primary reference: [manage workflow](../../skills/nuelink-cli-manage/references/manage-workflow.md)

Use this skill to retrieve channels for a brand.

Reference: `./references/channel-discovery.md`

## Commands

Table output:

```bash
nuelink-cli channels --brand-id SAMPLE_BRAND_ID --per-page 25 --page 1
```

JSON output:

```bash
nuelink-cli --json channels --brand-id SAMPLE_BRAND_ID --per-page 25 --page 1
```

## Expected API Result

- Endpoint: `GET /api/public/v1/brands/:brand_id/channels?per_page=<n>&page=<n>`
- Success code: `200`
- Example response: `examples/channels/list.response.json`

## Notes

- `--brand-id` is required.
- Use pagination flags for large channel sets.
