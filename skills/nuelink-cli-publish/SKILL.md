---
name: nuelink-cli-publish
description: Upload media and list, draft, queue, schedule, or publish posts with nuelink-cli. Resolve targets, default ambiguity to DRAFT, preview every mutation, and explicitly confirm uploads and non-draft posts; do not call REST or MCP directly.
---

# Nuelink CLI Publish

Use this skill to run safe end-to-end publishing workflows.

Read [the publish workflow](references/publish-workflow.md) for scheduling and confirmation guardrails.

## How To Use

Use this skill when the task ends with media upload or post creation.

```bash
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg --dry-run
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
```

## Safe Mutation Workflow

1. Resolve and confirm exactly one `BRAND_ID` and one `COLLECTION_ID`.
2. Optionally resolve channels; preview media uploads with `--dry-run`, confirm, then upload.
3. Validate payload fields and publish mode by running the complete post command with `--dry-run`.
4. If intent is ambiguous, use `publishMode=DRAFT`.
5. Require explicit confirmation for `QUEUE`, `SCHEDULE`, or `IMMEDIATE`.
6. Run the same command without `--dry-run` and return created resource IDs.

## Commands

List posts:

```bash
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
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

## Confirmed Execution Only

After explicit confirmation, repeat the fully validated upload or post command
without `--dry-run`. Keep `publishMode=DRAFT` unless the user explicitly chose
`QUEUE`, `SCHEDULE`, or `IMMEDIATE`.

## Simple Rule

- If the post content is unclear, use `DRAFT`.
- If the post is not a draft, ask for explicit confirmation.
- Use the smallest command that gets the job done.
