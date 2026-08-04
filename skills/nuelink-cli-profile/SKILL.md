---
name: nuelink-cli-profile
description: Use when a user asks to verify active auth identity with nuelink-cli me.
triggers: who am i, check profile, verify token, confirm account identity
boundaries: Read-only profile checks only; do not use for posting or configuration changes.
safety: If profile mismatches expected account, stop and ask before any mutation command.
---

# Nuelink CLI Profile

Compatibility alias: this flow is now consolidated under `nuelink-cli-setup`.

## Alias Routing

- Primary skill: `nuelink-cli-setup`
- Reference: `../nuelink-cli-setup/references/setup-workflow.md`

Use this skill when you need to validate auth and inspect the current account identity.

Reference: `./references/profile-checks.md`

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

- If auth is missing, save a key with `printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin`.
- If the wrong token is active, run `nuelink-cli auth:clear` and set a new one.
- If multiple environments exist, show `nuelink-cli auth:status` before running any create command.
