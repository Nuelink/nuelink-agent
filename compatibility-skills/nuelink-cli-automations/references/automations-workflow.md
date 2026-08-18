# Automations Workflow Reference

## Create Command Template

```bash
nuelink-cli automations:create \
  --brand-id BRAND_ID \
  --collection-id COLLECTION_ID \
  --feed-url "https://example.com/feed.xml" \
  --import-as-type IMAGE \
  --sub-type RSS \
  --title "Automation Title" \
  --type FEED \
  --dry-run
```

## Expected Endpoints

- `GET /api/public/v1/brands/:brand_id/automations`
- `POST /api/public/v1/brands/:brand_id/automations`

## Guardrail

- Run the complete create command with `--dry-run` before asking for confirmation.
- Do not create the automation until brand, collection, and feed URL are confirmed; then re-run without `--dry-run`.
