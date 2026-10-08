# Auth Flow Reference

## Safe Setup Sequence

```bash
npm install -g @nuelink/nuelink-cli@1.6.0
nuelink-cli --version
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli me
```

## CI Pattern

Inject `NUELINK_API_KEY` from the CI secret manager. Do not print environment
variables or pass the key in command arguments; restrict which child processes
inherit it.

```bash
nuelink-cli auth:status
nuelink-cli --json brands --per-page 5 --page 1
```

## Notes

- Prefer environment variables in CI.
- Rotate keys if they were shared or logged.
