---
name: nuelink-cli-collections
description: Use when a user asks to list collections or create a collection for a specific brand.
triggers: list collections, create collection, add queue slots, assign channels to collection
boundaries: Collection commands through nuelink-cli only; do not call raw REST or MCP directly.
safety: Resolve the brand first, preview validated payload, and require explicit intent before create.
---

# Nuelink CLI Collections

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Reference: `../nuelink-cli-manage/references/manage-workflow.md`

Use this skill to manage collections within a brand.

Reference: `./references/collections-workflow.md`

## Mutation Safety Workflow

1. Resolve the target brand with `nuelink-cli brands` and confirm one `BRAND_ID`.
2. Validate title, channels, and queues before execution.
3. Show the exact `collections:create` command for review.
4. Ask for explicit confirmation before running create.
5. Run the command and return the created collection ID from response data.

## List Collections

```bash
nuelink-cli collections --brand-id 13493 --per-page 25 --page 1
```

## Create Collection

```bash
nuelink-cli collections:create \
  --brand-id 13493 \
  --title "My Collection" \
  --description "Collection from CLI" \
  --max-republish 5 \
  --channels "300294,60112" \
  --queues "Mon 10:10,Mon 12:12"
```

## Examples

- Create request payload: `examples/collections/create.request.json`
- List response payload: `examples/collections/list.response.json`

## Expected API Results

- List endpoint: `GET /api/public/v1/brands/:brand_id/collections?page=<n>&per_page=<n>`
- Create endpoint: `POST /api/public/v1/brands/:brand_id/collections`
- Success codes: `200` for list, `201` for create

## Notes

- `--brand-id` and `--title` are required for create.
- `--channels` and `--queues` are comma-separated values.
- Use placeholders in examples such as `BRAND_ID` and `CHANNEL_ID`.
