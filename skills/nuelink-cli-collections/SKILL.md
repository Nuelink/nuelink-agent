---
name: nuelink-cli-collections
description: List and create collections for a brand.
---

# Nuelink CLI Collections

Use this skill to manage collections within a brand.

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
