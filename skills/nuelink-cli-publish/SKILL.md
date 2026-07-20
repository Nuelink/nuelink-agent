---
name: nuelink-cli-publish
description: Use when a user asks to upload media, draft, queue, schedule, publish, or list posts via nuelink-cli.
triggers: draft post, publish now, queue post, schedule post, upload media, list posts, create post from json
boundaries: Publish workflows through nuelink-cli only; do not use for direct REST or MCP calls.
safety: Resolve IDs first, default ambiguous intent to DRAFT, and require explicit confirmation for QUEUE, SCHEDULE, or IMMEDIATE.
---

# Nuelink CLI Publish

Use this skill to run safe end-to-end publishing workflows.

Reference: `./references/publish-workflow.md`

## Safe Mutation Workflow

1. Resolve and confirm exactly one `BRAND_ID` and one `COLLECTION_ID`.
2. Optionally resolve channels and upload media IDs.
3. Validate payload fields and publish mode.
4. If intent is ambiguous, use `publishMode=DRAFT`.
5. Require explicit confirmation for `QUEUE`, `SCHEDULE`, or `IMMEDIATE`.
6. Run the command and return created resource IDs.

## Commands

List posts:

```bash
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
```

Upload media:

```bash
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg
```

Create draft post:

```bash
nuelink-cli posts:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --title "Post title" \
  --caption "Post body" \
  --publish-mode DRAFT
```

Create scheduled post with JSON payload:

```bash
nuelink-cli posts:add-json \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --payload ./post.json
```
