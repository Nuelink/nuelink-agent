---
name: nuelink-cli-automations
description: List automations or safely create feed-based automations with nuelink-cli. Use for RSS/feed imports and automation setup; confirm targets and explicit create intent, and do not use for direct API calls.
---

# Nuelink CLI Automations

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need to inspect or create feed-based automations.

```bash
nuelink-cli automations --brand-id BRAND_ID
nuelink-cli automations:create --brand-id BRAND_ID --collection-id COLLECTION_ID --feed-url "https://example.com/feed.xml" --dry-run
```

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Primary reference: [manage workflow](../../skills/nuelink-cli-manage/references/manage-workflow.md)

Use this skill to inspect and create automations.

Reference: `./references/automations-workflow.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID` and one `COLLECTION_ID`.
2. Validate `--feed-url` and required enum fields before execution.
3. Run the complete command with `--dry-run` and present the resolved type, source URL, and target collection.
4. Require explicit user confirmation before `automations:create`.
5. Run the same command without `--dry-run`, then return the automation ID plus enabled status.

## List Automations

```bash
nuelink-cli automations --brand-id SAMPLE_BRAND_ID
```

## Create Automation

```bash
nuelink-cli automations:create \
  --brand-id SAMPLE_BRAND_ID \
  --collection-id SAMPLE_COLLECTION_ID \
  --feed-url "https://www.nasa.gov/rss/dyn/breaking_news.rss" \
  --import-as-type IMAGE \
  --sub-type RSS \
  --title "NASA Breaking News" \
  --type FEED \
  --dynamic-title "{{title}}" \
  --dynamic-body "{title} {link}" \
  --dry-run
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
- Optional fields: `--description`, `--type`, `--dynamic-title`,
  `--dynamic-body`, `--load-old-posts`, `--add-posts-as-draft`, and
  `--refresh-rate` (`24`, `12`, `6`, or `1`).
- `--import-as-type` accepts `LINK`, `IMAGE`, `VIDEO`, or `CAROUSEL`.
- `--sub-type` accepts the feed subtypes defined by the OpenAPI contract; run
  `nuelink-cli help automations:create` for the command reference.
- Use placeholder IDs in examples; never ship real account IDs.
