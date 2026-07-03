---
name: nuelink-cli-automations
description: List and create automations for a brand and collection.
---

# Nuelink CLI Automations

Use this skill to inspect and create automations.

## List Automations

```bash
nuelink-cli automations --brand-id 13493
```

## Create Automation

```bash
nuelink-cli automations:create \
  --brand-id 13493 \
  --collection-id 720 \
  --feed-url "https://www.nasa.gov/rss/dyn/breaking_news.rss" \
  --import-as-type IMAGE \
  --sub-type RSS \
  --title "NASA Breaking News" \
  --type FEED \
  --dynamic-title "{{title}}" \
  --dynamic-body "{title} {link}"
```

## Examples

- Create request payload: `examples/automations/create.request.json`
- List response payload: `examples/automations/list.response.json`

## Expected API Results

- List endpoint: `GET /api/public/v1/brands/:brand_id/automations`
- Create endpoint: `POST /api/public/v1/brands/:brand_id/automations`
- Success codes: `200` for list, `201` for create

## Notes

- Required: `--brand-id`, `--collection-id`, `--feed-url`, `--import-as-type`, `--sub-type`, `--title`.
- Optional fields: `--description`, `--type`, `--dynamic-title`, `--dynamic-body`.
