# Profile Checks Reference

## Commands

```bash
nuelink-cli auth:status
nuelink-cli me
```

## Expected Endpoint

- `GET /api/public/v1/me`
- Success status `200`

## Guardrail

- If profile data does not match the intended account, stop before any mutation command.
