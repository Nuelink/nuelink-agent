---
name: nuelink-cli-automations
description: Use when a user asks to list automations or create feed-based automations in a collection.
triggers: list automations, create rss automation, import feed posts, automation setup
boundaries: Automation workflows via nuelink-cli only; do not use for direct API calls.
safety: Confirm brand and collection targets, validate feed URL, and require explicit create intent.
---

# Nuelink CLI Automations

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Reference: `../nuelink-cli-manage/references/manage-workflow.md`

Use this skill to inspect and create automations.

Reference: `./references/automations-workflow.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID` and one `COLLECTION_ID`.
2. Validate `--feed-url` and required enum fields before execution.
3. Present a final action summary with type, source URL, and target collection.
4. Require explicit user confirmation before `automations:create`.
5. Run the command and return automation ID plus enabled status.

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
- Optional fields: `--description`, `--type`, `--dynamic-title`,
  `--dynamic-body`, `--load-old-posts`, `--add-posts-as-draft`, and
  `--refresh-rate` (`24`, `12`, `6`, or `1`).
- `--import-as-type` accepts `LINK`, `IMAGE`, `VIDEO`, or `CAROUSEL`.
- `--sub-type` accepts the feed subtypes defined by the OpenAPI contract; run
  `nuelink-cli help automations:create` for the command reference.
- Use placeholder IDs in examples; never ship real account IDs.
