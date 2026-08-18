# Setup Workflow Reference

## Install And Verify

```bash
npm install -g @nuelink/nuelink-cli
nuelink-cli --version
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli me
```

## CI Auth Pattern

```bash
export NUELINK_API_KEY="YOUR_API_KEY"
nuelink-cli auth:status
```

## Guardrails

- Keep credentials out of command history where possible.
- Never share API keys in logs or screenshots.
