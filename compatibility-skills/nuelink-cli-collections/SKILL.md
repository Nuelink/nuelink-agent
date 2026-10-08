---
name: nuelink-cli-collections
description: List or safely manage collections for a brand with nuelink-cli, including queue slots and channel assignments. Resolve IDs, preview mutations, and require explicit confirmation; do not call REST or MCP directly.
---

# Nuelink CLI Collections

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need to list or create or update collections, manage channel assignments, or manage queue slots for one brand.

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
4. Ask for explicit confirmation before running the mutation.
5. Run the same command without `--dry-run` and read the collection back when the API provides enough returned state to verify it.

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

- Update collection: `collections:update --brand-id BRAND_ID --collection-id COLLECTION_ID --status PAUSED --dry-run`
- Add channel: `collections:add-channel --brand-id BRAND_ID --collection-id COLLECTION_ID --channel-id CHANNEL_ID --dry-run`
- Remove channel: `collections:remove-channel --brand-id BRAND_ID --collection-id COLLECTION_ID --channel-id CHANNEL_ID --dry-run`
- Add queue slot: `collections:add-queue --brand-id BRAND_ID --collection-id COLLECTION_ID --date "Mon 09:30" --dry-run`
- Delete queue slot: `collections:delete-queue --brand-id BRAND_ID --collection-id COLLECTION_ID --queue-id QUEUE_ID --dry-run`

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
