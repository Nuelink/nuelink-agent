# Collections Workflow Reference

## Create Command Template

```bash
nuelink-cli collections:create \
  --brand-id BRAND_ID \
  --title "Collection Title" \
  --description "Collection Description" \
  --max-republish 5 \
  --channels "CHANNEL_ID_1,CHANNEL_ID_2" \
  --queues "Mon 10:10,Wed 14:30"
```

## Expected Endpoints

- `GET /api/public/v1/brands/:brand_id/collections?page=<n>&per_page=<n>`
- `POST /api/public/v1/brands/:brand_id/collections`

## Guardrail

- Run the complete create command with `--dry-run`, then confirm the brand target and previewed payload before re-running without `--dry-run`.
