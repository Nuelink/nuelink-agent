# Automations Workflow Reference

## Create Command Template

```bash
nuelink-cli automations:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --feed-url "https://example.com/feed.xml" \
  --import-as-type IMAGE \
  --name "Automation Title" \
  --type RSS \
  --load-old-posts false \
  --add-posts-as-draft true \
  --refresh-rate 6 \
  --dry-run
```

List and create responses include `addPostsAsDraft` and `refreshRate` (hours:
1, 6, 12, or 24). `loadOldPosts` is a create input and is not returned.

## Expected Endpoints

- `GET /api/public/v1/brands/:brand_id/automations`
- `POST /api/public/v1/brands/:brand_id/automations`
- `PATCH /api/public/v1/brands/:brand_id/automations/:automation_id`

## Guardrail

- Run the complete create command with `--dry-run` before asking for confirmation.
- Do not create the automation until brand, collection, and feed URL are confirmed; then re-run without `--dry-run`.
- Preview pause or activate requests with `automations:update-status --dry-run`, confirm the selected automation and target status, then verify through the automation list.
