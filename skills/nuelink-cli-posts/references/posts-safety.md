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
  "scheduledAt": "2026-08-01 16:00:00"
}
```

## Guardrail

- Use `DRAFT` when user intent is ambiguous.
- Require explicit confirmation for queue, schedule, and immediate publish.
