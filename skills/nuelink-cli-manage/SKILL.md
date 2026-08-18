---
name: nuelink-cli-manage
description: List or safely create brand resources with nuelink-cli, including collections, channels, automations, and media inventory. Resolve IDs, stop on ambiguity, preview and confirm mutations; exclude post publishing and direct API calls.
---

# Nuelink CLI Manage

Use this skill to discover resources and perform safe non-post mutations.

Read [the manage workflow](references/manage-workflow.md) for discovery and mutation guardrails.

## How To Use

Use this skill when you need to list a brand resource first, then create or update something tied to that brand.

```bash
nuelink-cli brands --per-page 25 --page 1
nuelink-cli collections --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli media --brand-id BRAND_ID
```

## Discovery Commands

```bash
nuelink-cli brands --per-page 25 --page 1
nuelink-cli collections --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli channels --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli automations --brand-id BRAND_ID
nuelink-cli media --brand-id BRAND_ID
```

## Safe Mutation Workflow

1. Resolve resource names and confirm one target ID per resource.
2. Validate payload fields and required enums.
3. Run the exact create command with `--dry-run` and show the validated payload.
4. Obtain explicit user confirmation before create.
5. Run the same command without `--dry-run`, then return the created ID and key status fields.

## Mutation Previews

Create collection:

```bash
nuelink-cli collections:create \
  --brand-id BRAND_ID \
  --title "Collection Title" \
  --description "Collection Description" \
  --max-republish 5 \
  --channels "CHANNEL_ID_1,CHANNEL_ID_2" \
  --queues "Mon 10:10,Wed 14:30" \
  --dry-run
```

Create automation:

```bash
nuelink-cli automations:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --feed-url "https://example.com/feed.xml" \
  --import-as-type IMAGE \
  --sub-type RSS \
  --title "Automation Title" \
  --type FEED \
  --dry-run
```

## Confirmed Execution Only

After the user confirms the preview, repeat the same complete command without
`--dry-run`. Do not use an abbreviated command that could change the payload.

## Keep It Simple

- Discover the target ID before creating anything.
- Use `--dry-run` before the real command.
- Prefer one resource change at a time.
