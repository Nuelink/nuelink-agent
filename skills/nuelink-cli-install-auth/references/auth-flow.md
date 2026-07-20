# Auth Flow Reference

## Safe Setup Sequence

```bash
npm install -g @nuelink/nuelink-cli
nuelink-cli --auth YOUR_API_KEY
nuelink-cli auth:status
nuelink-cli me
```

## CI Pattern

```bash
export NUELINK_API_KEY="YOUR_API_KEY"
nuelink-cli auth:status
nuelink-cli --json brands --per-page 5 --page 1
```

## Notes

- Prefer environment variables in CI.
- Rotate keys if they were shared or logged.
