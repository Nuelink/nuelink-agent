---
name: nuelink-cli-posts
description: List, draft, queue, schedule, or publish Nuelink posts with nuelink-cli. Resolve targets, default ambiguous intent to DRAFT, preview mutations, and explicitly confirm QUEUE, SCHEDULE, or IMMEDIATE; do not call REST or MCP directly.
---

# Nuelink CLI Posts

Compatibility alias: this flow is now consolidated under `nuelink-cli-publish`.

## How To Use

Use this alias when the request is about listing posts or creating one post.

```bash
nuelink-cli posts --brand-id BRAND_ID --collection-id COLLECTION_ID
nuelink-cli posts:create --brand-id BRAND_ID --collection-id COLLECTION_ID --title "Post title" --publish-mode DRAFT --dry-run
```

## Alias Routing

- Primary skill: `nuelink-cli-publish`
- Primary reference: [publish workflow](../../skills/nuelink-cli-publish/references/publish-workflow.md)

Use this skill to list and create posts in a collection.

Reference: `./references/posts-safety.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID` and one `COLLECTION_ID`.
2. Validate payload fields and publish mode by running the complete create command with `--dry-run`.
3. If publishing intent is ambiguous, set `publishMode` to `DRAFT`.
4. For `QUEUE`, `SCHEDULE`, or `IMMEDIATE`, ask for explicit intent confirmation.
5. Run the same command without `--dry-run` and return the post ID and final publish mode.

## List Posts

```bash
nuelink-cli posts --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID
```

## Create Post From JSON

```bash
nuelink-cli posts:add-json --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID --payload ./post.json --dry-run
```

Example `post.json`:

```json
{
  "title": "CLI Post Title",
  "caption": "Post body from CLI",
  "publishMode": "DRAFT"
}
```

API-style payload example from Postman:

```json
{
  "title": "title here",
  "caption": "body here as well",
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

## Expected API Results

- List endpoint: `GET /api/public/v1/brands/:brand_id/collections/:collection_id/posts`
- Create endpoint: `POST /api/public/v1/brands/:brand_id/collections/:collection_id/posts`
- Success codes: `200` for list, `201` for create

## Notes

- Required for all post commands: `--brand-id`, `--collection-id`.
- For `posts:add-json`, `--payload` must point to valid JSON.
- `posts:create` supports many platform-specific flags.
- Supported publish modes are `DRAFT`, `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
- Scheduled values use `YYYY-MM-DD HH:mm:ss`; poll option indexes are
  zero-based.
