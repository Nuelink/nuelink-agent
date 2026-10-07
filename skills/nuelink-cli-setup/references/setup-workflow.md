# Setup Workflow Reference

## Install And Verify

The CLI requires Node.js 18.17 or later. Install the fixed release so base URL
trust checks and raw JSON null handling are available.

```bash
npm install -g @nuelink/nuelink-cli@1.5.0
nuelink-cli --version
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli auth:validate
nuelink-cli me
```

## CI Auth Pattern

Inject `NUELINK_API_KEY` from the CI secret manager. Do not echo environment
variables, put the key in command arguments, or pass it to unrelated child
processes.

```bash
nuelink-cli auth:status
nuelink-cli auth:validate
```

## Guardrails

- Keep credentials out of command history where possible.
- Never share API keys in logs or screenshots.
- Saved-config encryption is obfuscation; filesystem permissions protect the credential file.
