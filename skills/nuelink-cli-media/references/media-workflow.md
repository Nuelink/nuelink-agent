# Media Workflow Reference

## Commands

```bash
nuelink-cli media --brand-id BRAND_ID
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg
```

## Expected Endpoints

- `GET /api/public/v1/brands/:brand_id/media`
- `POST /api/public/v1/brands/:brand_id/media`

## Guardrail

- Confirm target brand and local file path before upload.
