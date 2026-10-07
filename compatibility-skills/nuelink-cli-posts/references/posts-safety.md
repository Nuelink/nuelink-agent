# Posts Safety Reference

## Publish Modes

- `DRAFT`
- `QUEUE`
- `SCHEDULE`
- `IMMEDIATE`

## Safe Create Template

```bash
nuelink-cli posts:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --title "Post title" \
  --caption "Post body" \
  --publish-mode DRAFT \
  --dry-run
```

## Scheduled Create Template

```bash
nuelink-cli posts:add-json \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --payload ./post.json \
  --dry-run
```

```json
{
  "title": "Post title",
  "caption": "Post body",
  "publishMode": "SCHEDULE",
  "scheduledAt": "BRAND_LOCAL_YYYY-MM-DD_HH:mm:ss"
}
```

## Guardrail

- Use `DRAFT` when user intent is ambiguous.
- Retrieve and display the brand's IANA timezone, resolve the user's time in that zone, and confirm the exact local date/time. `scheduledAt` is brand-local; returned `postDate` and list filters use UTC.
- Scheduling requires at least 10 minutes' lead time. Recheck immediately before execution; do not silently shift the requested time.
- Read the post back after a mutation and verify the exposed ID, status, type, and schedule. Do not claim fields missing from read-back were verified.
- Prefer changing a pending post to `DRAFT` when the goal is only to stop publication; use delete only when explicitly requested.
- Run the complete mutation with `--dry-run` before requesting confirmation.
- Require explicit confirmation for queue, schedule, and immediate publish.
- Preview `posts:update` and `posts:delete` with `--dry-run`; confirm the exact brand and post IDs.
- Preview `posts:move` with `--dry-run`; confirm the brand, source and destination collection IDs, and every post ID. A move is atomic and accepts at most 100 unique IDs.
- Treat deletion as irreversible and require a fresh explicit confirmation immediately before execution.
- Re-run without `--dry-run` after confirmation.
