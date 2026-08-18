# Channel Discovery Reference

## Commands

```bash
nuelink-cli channels --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli --json channels --brand-id BRAND_ID --per-page 25 --page 1
```

## Expected Endpoint

- `GET /api/public/v1/brands/:brand_id/channels?per_page=<n>&page=<n>`

## Guardrail

- Always confirm one `BRAND_ID` when multiple brands are available.
