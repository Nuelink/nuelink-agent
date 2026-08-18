# Brand Discovery Reference

## Commands

```bash
nuelink-cli brands --per-page 25 --page 1
nuelink-cli --json brands --per-page 25 --page 1
```

## Expected Endpoint

- `GET /api/public/v1/brands?per_page=<n>&page=<n>`

## Guardrail

- Use one confirmed `BRAND_ID` before create flows.
