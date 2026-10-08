---
name: nuelink-cli-posts
description: List, draft, queue, schedule, move, update, delete, publish, or review Nuelink posts with nuelink-cli. Resolve targets, default ambiguous intent to DRAFT, preview mutations, and explicitly confirm publishing, moves, updates, and deletion; do not call REST or MCP directly.
---

# Nuelink CLI Posts

Compatibility alias: this flow is now consolidated under `nuelink-cli-publish`.

## How To Use

Use this alias when the request is about listing, creating, moving, updating, deleting, scheduling, or reviewing posts.

```bash
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
nuelink-cli posts:create --brand-id BRAND_ID --collection-id COLLECTION_ID --title "Post title" --publish-mode DRAFT --dry-run
```

## Alias Routing

- Primary skill: `nuelink-cli-publish`
- Primary reference: [publish workflow](../../skills/nuelink-cli-publish/references/publish-workflow.md)

Use this skill for post discovery and lifecycle actions.

Reference: `./references/posts-safety.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID` and one `COLLECTION_ID`.
2. Validate payload fields and publish mode by running the complete create command with `--dry-run`.
3. If publishing intent is ambiguous, set `publishMode` to `DRAFT`.
4. For `QUEUE`, `SCHEDULE`, or `IMMEDIATE`, ask for explicit intent confirmation.
5. Require separate explicit confirmation before moving, updating, or deleting posts.
6. Run the same command without `--dry-run` and return the post ID and final publish mode.

## List Posts

```bash
nuelink-cli posts --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID
nuelink-cli posts --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID \
  --status PENDING --post-type IMAGE --posting-type SCHEDULE \
  --created-from "2026-10-01 00:00:00" --sort-by post_date --sort-order desc
```

Brand-wide views, queue schedule, and published results:

```bash
nuelink-cli brand-posts --brand-id SAMPLE_BRAND_ID --view SCHEDULED
nuelink-cli schedule --brand-id SAMPLE_BRAND_ID
nuelink-cli published-posts --brand-id SAMPLE_BRAND_ID --status PUBLISHED
```

## Create Post From JSON

```bash
nuelink-cli posts:add-json --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID --payload ./post.json --dry-run
```

## Move, Update, Or Delete Post

```bash
nuelink-cli posts:update --brand-id SAMPLE_BRAND_ID --post-id SAMPLE_POST_ID \
  --caption "Updated post text" --dry-run

nuelink-cli posts:update --brand-id SAMPLE_BRAND_ID --post-id SAMPLE_POST_ID \
  --queue-position FRONT --dry-run

nuelink-cli posts:move --brand-id SAMPLE_BRAND_ID \
  --source-collection-id SOURCE_COLLECTION_ID \
  --destination-collection-id DESTINATION_COLLECTION_ID \
  --post-ids "SAMPLE_POST_ID_1,SAMPLE_POST_ID_2" --dry-run

nuelink-cli posts:delete --brand-id SAMPLE_BRAND_ID --post-id SAMPLE_POST_ID --dry-run
```

Example `post.json`:

```json
{
  "title": "CLI Post Title",
  "caption": "Post body from CLI",
  "autoThreadText": true,
  "publishMode": "DRAFT"
}
```

API-style payload example from Postman:

```json
{
  "title": "title here",
  "caption": "body here as well",
  "autoThreadText": true,
  "publishMode": "DRAFT",
  "media": [
    {
      "id": "SAMPLE_MEDIA_ID"
    }
  ]
}
```

## Create Post With CLI Flags

```bash
nuelink-cli posts:create \
  --brand-id SAMPLE_BRAND_ID \
  --collection-id SAMPLE_COLLECTION_ID \
  --title "title here" \
  --caption "body here" \
  --publish-mode DRAFT \
  --media-ids "SAMPLE_MEDIA_ID" \
  --youtube-tags "tag1,tag2" \
  --dry-run
```

## Examples

- Create request payload: `examples/posts/create.request.json`
- List response payload: `examples/posts/list.response.json`
- Update request payload: `examples/posts/update.request.json`
- Published results payload: `examples/posts/published.response.json`
- Weekly schedule payload: `examples/posts/schedule.response.json`

## Expected API Results

- List endpoint: `GET /api/public/v1/brands/:brand_id/collections/:collection_id/posts`
- Create endpoint: `POST /api/public/v1/brands/:brand_id/collections/:collection_id/posts`
- Brand list endpoint: `GET /api/public/v1/brands/:brand_id/posts`
- Update/delete endpoint: `PATCH|DELETE /api/public/v1/brands/:brand_id/posts/:post_id`
- Move endpoint: `PATCH /api/public/v1/brands/:brand_id/posts/move`
- Published results endpoint: `GET /api/public/v1/brands/:brand_id/published-posts`
- Schedule endpoint: `GET /api/public/v1/brands/:brand_id/schedule`
- Success codes: `200` for reads, updates, and deletion; `201` for create

## Notes

- Collection list/create commands require `--brand-id` and `--collection-id`.
- Update/delete commands require `--brand-id` and `--post-id`; brand-wide reads require `--brand-id`.
- Moves require a brand, distinct source and destination collections, and 1–100 unique post IDs. The API moves them atomically.
- For `posts:add-json`, `--payload` must point to valid JSON.
- `posts:create` supports many platform-specific flags.
- `posts:delete` is irreversible and requires sensitive AI actions to be enabled in Nuelink.
- Supported publish modes are `DRAFT`, `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
- Scheduled values use `YYYY-MM-DD HH:mm:ss`; poll option indexes are
  zero-based.
- List filters include status, post type, posting type, UTC creation-time
  boundaries, and deterministic sorting. `--created-to` must not precede
  `--created-from`.
