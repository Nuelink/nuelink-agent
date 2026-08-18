---
name: nuelink-cli-collections
description: List or safely create collections for a brand with nuelink-cli, including queue slots and channel assignment. Resolve the brand, preview mutations, and require explicit create intent; do not call REST or MCP directly.
---

# Nuelink CLI Collections

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need to list or create collections for one brand.

```bash
nuelink-cli collections --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli collections:create --brand-id BRAND_ID --title "Collection Title" --dry-run
```

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Primary reference: [manage workflow](../../skills/nuelink-cli-manage/references/manage-workflow.md)

Use this skill to manage collections within a brand.

Reference: `./references/collections-workflow.md`

## Mutation Safety Workflow

1. Resolve the target brand with `nuelink-cli brands` and confirm one `BRAND_ID`.
2. Validate title, channels, and queues before execution.
3. Run the exact `collections:create` command with `--dry-run` and show its validated payload for review.
4. Ask for explicit confirmation before running create.
5. Run the same command without `--dry-run` and return the created collection ID from response data.

## List Collections

```bash
nuelink-cli collections --brand-id SAMPLE_BRAND_ID --per-page 25 --page 1
```

## Create Collection

```bash
nuelink-cli collections:create \
  --brand-id SAMPLE_BRAND_ID \
  --title "My Collection" \
  --description "Collection from CLI" \
  --max-republish 5 \
  --channels "SAMPLE_CHANNEL_ID_1,SAMPLE_CHANNEL_ID_2" \
  --queues "Mon 10:10,Mon 12:12" \
  --dry-run
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
