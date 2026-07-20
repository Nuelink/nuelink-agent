---
name: nuelink-cli-manage
description: Use when a user asks to list or create brands-related resources such as collections, channels, automations, and media inventory.
triggers: list brands, list channels, list collections, create collection, list automations, create automation, list media
boundaries: Resource management via nuelink-cli only; excludes post publishing flows.
safety: Resolve names to IDs first, stop on ambiguous matches, preview create actions, and require explicit confirmation before mutations.
---

# Nuelink CLI Manage

Use this skill to discover resources and perform safe non-post mutations.

Reference: `./references/manage-workflow.md`

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
3. Show exact create command before execution.
4. Obtain explicit user confirmation before create.
5. Return created ID and key status fields.

## Mutation Commands

Create collection:

```bash
nuelink-cli collections:create \
  --brand-id BRAND_ID \
  --title "Collection Title" \
  --description "Collection Description" \
  --max-republish 5 \
  --channels "CHANNEL_ID_1,CHANNEL_ID_2" \
  --queues "Mon 10:10,Wed 14:30"
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
  --type FEED
```
