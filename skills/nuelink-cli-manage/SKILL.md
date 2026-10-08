---
name: nuelink-cli-manage
description: List or safely manage brand resources with nuelink-cli, including collections, channels, automations, and media inventory. Resolve IDs, stop on ambiguity, preview and confirm mutations; exclude post publishing and direct API calls.
---

# Nuelink CLI Manage

Use this skill to discover resources and perform safe non-post mutations.

Read [the manage workflow](references/manage-workflow.md) for discovery and mutation guardrails.

## How To Use

Use this skill to list and manage collections and automations, including channel assignments and weekly queue slots. Post updates belong to `nuelink-cli-publish`.

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
3. Run the exact mutation command with `--dry-run` and show the validated request.
4. Obtain explicit user confirmation before executing the mutation.
5. Run the same command without `--dry-run`, then read the resource back by ID or through its list command and compare the returned ID and key status fields with the request.
6. For media, allow for processing delay and retry read-only listing before treating a new upload as missing.

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

Update collection, channel assignment, and queue slot examples:

```bash
nuelink-cli collections:update --brand-id BRAND_ID --collection-id COLLECTION_ID --status PAUSED --dry-run
nuelink-cli collections:update --brand-id BRAND_ID --collection-id COLLECTION_ID --clear-description --dry-run
nuelink-cli collections:add-channel --brand-id BRAND_ID --collection-id COLLECTION_ID --channel-id CHANNEL_ID --dry-run
nuelink-cli collections:remove-channel --brand-id BRAND_ID --collection-id COLLECTION_ID --channel-id CHANNEL_ID --dry-run
nuelink-cli collections:add-queue --brand-id BRAND_ID --collection-id COLLECTION_ID --date "Mon 09:30" --dry-run
nuelink-cli collections:delete-queue --brand-id BRAND_ID --collection-id COLLECTION_ID --queue-id QUEUE_ID --dry-run
```

Create automation:

```bash
nuelink-cli automations:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --feed-url "https://example.com/feed.xml" \
  --import-as-type IMAGE \
  --name "Automation Title" \
  --type RSS \
  --title "{{title}}" \
  --caption "{{description}} {{link}}" \
  --load-old-posts false \
  --add-posts-as-draft true \
  --dry-run
```

Pause or activate an automation:

```bash
nuelink-cli automations:update-status --brand-id BRAND_ID --automation-id AUTOMATION_ID --status PAUSED --dry-run
```

## Confirmed Execution Only

New RSS automations should set `--load-old-posts false` and
`--add-posts-as-draft true` explicitly. Read the automation back; its list
response may omit these import-policy settings, so do not claim they were
independently verified if they are not returned.

After the user confirms the preview, repeat the same complete command without
`--dry-run`. Do not use an abbreviated command that could change the payload.

## Keep It Simple

- Discover the target ID before creating anything.
- Confirm the exact target and change before updating collection settings, channel assignments, queue slots, or automation status.
- Use `--dry-run` before the real command.
- Prefer one resource change at a time.
