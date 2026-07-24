---
name: nuelink-cli-posts
description: Use when a user asks to list, draft, queue, schedule, or publish Nuelink posts with nuelink-cli.
triggers: draft post, queue post, schedule post, publish now, list posts, post json payload
boundaries: Post workflows through nuelink-cli only; do not use for direct REST or MCP calls.
safety: Resolve brand and collection first, default ambiguous intent to DRAFT, and require explicit confirmation for QUEUE, SCHEDULE, or IMMEDIATE.
---

# Nuelink CLI Posts

Compatibility alias: this flow is now consolidated under `nuelink-cli-publish`.

## Alias Routing

- Primary skill: `nuelink-cli-publish`
- Reference: `../nuelink-cli-publish/references/publish-workflow.md`

Use this skill to list and create posts in a collection.

Reference: `./references/posts-safety.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID` and one `COLLECTION_ID`.
2. Validate payload fields and publish mode before sending.
3. If publishing intent is ambiguous, set `publishMode` to `DRAFT`.
4. For `QUEUE`, `SCHEDULE`, or `IMMEDIATE`, ask for explicit intent confirmation.
5. Run create command and return created post ID and final publish mode.

## List Posts

```bash
nuelink-cli posts --brand-id 13493 --collection-id 33273
```

## Create Post From JSON

```bash
nuelink-cli posts:add-json --brand-id 13493 --collection-id 33273 --payload ./post.json
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
      "id": "bWVkaWEvWThQT0NxWWFRcEtIRXZYMW16U0hsZFRnN0hFdEpYVzIubXA0"
    }
  ]
}
```

## Create Post With CLI Flags

```bash
nuelink-cli posts:create \
  --brand-id 13493 \
  --collection-id 33273 \
  --title "title here" \
  --caption "body here" \
  --publish-mode DRAFT \
  --media-ids "media-id-1" \
  --youtube-tags "tag1,tag2"
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
