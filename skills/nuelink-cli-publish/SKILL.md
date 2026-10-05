---
name: nuelink-cli-publish
description: Upload media and list, draft, queue, schedule, update, delete, or review published posts with nuelink-cli. Resolve targets, default ambiguity to DRAFT, preview every mutation, and explicitly confirm uploads, non-draft posts, updates, and deletion; do not call REST or MCP directly.
---

# Nuelink CLI Publish

Use this skill to run safe end-to-end publishing workflows.

Read [the publish workflow](references/publish-workflow.md) for scheduling and confirmation guardrails.

## How To Use

Use this skill for media uploads and all post discovery, creation, schedule, update, deletion, and results workflows.

```bash
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg --dry-run
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
nuelink-cli brand-posts --brand-id BRAND_ID --view SCHEDULED
nuelink-cli published-posts --brand-id BRAND_ID
```

## Safe Mutation Workflow

1. Resolve and confirm exactly one `BRAND_ID` and one `COLLECTION_ID`.
2. Optionally resolve channels; preview media uploads with `--dry-run`, confirm, then upload.
3. Validate payload fields and publish mode by running the complete post command with `--dry-run`.
4. If intent is ambiguous, use `publishMode=DRAFT`.
5. Require explicit confirmation for `QUEUE`, `SCHEDULE`, or `IMMEDIATE`.
6. Require separate explicit confirmation immediately before any `posts:delete` execution.
7. Run the same command without `--dry-run` and return affected resource IDs.

## Commands

List posts:

```bash
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID \
  --status PENDING --post-type IMAGE --posting-type SCHEDULE \
  --created-from "2026-10-01 00:00:00" --sort-by post_date --sort-order desc
```

Post listing also supports `--created-to`; use UTC timestamps in
`YYYY-MM-DD HH:mm:ss` format and ensure `--created-to` is not earlier than
`--created-from`.

List posts across every collection, inspect the queue schedule, or review results:

```bash
nuelink-cli brand-posts --brand-id BRAND_ID --view QUEUE
nuelink-cli schedule --brand-id BRAND_ID
nuelink-cli published-posts --brand-id BRAND_ID --status PUBLISHED --sort-by likes
```

Upload media:

```bash
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg --dry-run
```

Create draft post:

```bash
nuelink-cli posts:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --title "Post title" \
  --caption "Post body" \
  --publish-mode DRAFT \
  --dry-run
```

Create scheduled post with JSON payload:

```bash
nuelink-cli posts:add-json \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --payload ./post.json \
  --dry-run
```

Preview rescheduling or moving a queued post:

```bash
nuelink-cli posts:update \
  --brand-id BRAND_ID \
  --post-id POST_ID \
  --publish-mode SCHEDULE \
  --scheduled-at "2026-10-12 09:00:00" \
  --dry-run

nuelink-cli posts:update \
  --brand-id BRAND_ID \
  --post-id POST_ID \
  --queue-position FRONT \
  --dry-run
```

Preview the sensitive delete command, then obtain explicit confirmation before executing it:

```bash
nuelink-cli posts:delete --brand-id BRAND_ID --post-id POST_ID --dry-run
```

## Confirmed Execution Only

After explicit confirmation, repeat the fully validated upload or post command
without `--dry-run`. Keep `publishMode=DRAFT` unless the user explicitly chose
`QUEUE`, `SCHEDULE`, or `IMMEDIATE`. Treat deletion as irreversible even when
the account has enabled sensitive AI actions.

## Simple Rule

- If the post content is unclear, use `DRAFT`.
- If the post is not a draft, ask for explicit confirmation.
- Confirm post updates and deletions against the exact brand and post IDs.
- Use the smallest command that gets the job done.
