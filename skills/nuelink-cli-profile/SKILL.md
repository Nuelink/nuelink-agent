---
name: nuelink-cli-profile
description: Retrieve the current authenticated profile with nuelink-cli me.
---

# Nuelink CLI Profile

Use this skill when you need to validate auth and inspect the current account identity.

## Command

```bash
nuelink-cli me
```

## Expected API Result

- Endpoint: `GET /api/public/v1/me`
- Success code: `200`
- Example response: `examples/profile/me.response.json`

## Typical Flow

```bash
nuelink-cli auth:status
nuelink-cli me
```

## Troubleshooting

- If auth is missing, save a key with `nuelink-cli --auth YOUR_API_KEY`.
- If the wrong token is active, run `nuelink-cli auth:clear` and set a new one.
