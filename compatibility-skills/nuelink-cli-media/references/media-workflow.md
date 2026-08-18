# Media Workflow Reference

## Commands

```bash
nuelink-cli media --brand-id BRAND_ID --type IMAGE
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg --dry-run
```

## Expected Endpoints

- `GET /api/public/v1/brands/:brand_id/media`
- `POST /api/public/v1/brands/:brand_id/media`

## Guardrail

- Run `media:upload` with `--dry-run` to validate the target and file metadata.
- Confirm the target brand and local file path, then re-run without `--dry-run`.
