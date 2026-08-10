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
  --publish-mode DRAFT
```

## Scheduled Create Template

```bash
nuelink-cli posts:add-json \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --payload ./post.json
```

```json
{
  "title": "Post title",
  "caption": "Post body",
  "publishMode": "SCHEDULE",
  "scheduledAt": "YYYY-MM-DD HH:mm:ss"
}
```

## Guardrail

- Use `DRAFT` when user intent is ambiguous.
- Resolve the placeholder to a future date and time in the brand's timezone.
- Run the complete mutation with `--dry-run` before requesting confirmation.
- Require explicit confirmation for queue, schedule, and immediate publish.
- Re-run without `--dry-run` after confirmation.
