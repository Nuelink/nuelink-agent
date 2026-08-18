---
name: nuelink-cli-install-auth
description: Install, authenticate, verify, or reset Nuelink CLI credentials. Use for CLI setup and auth only; never print full API keys, prefer NUELINK_API_KEY in CI, and avoid direct REST or MCP calls.
---

# Nuelink CLI Install And Auth

Compatibility alias: this flow is now consolidated under `nuelink-cli-setup`.

Use `nuelink-cli-setup` for full setup and auth workflows.

## How To Use

Use this alias when the request is only about install, login, logout, or checking the active account.

```bash
npm install -g @nuelink/nuelink-cli
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
```

## Alias Routing

- Primary skill: `nuelink-cli-setup`
- Primary reference: [setup workflow](../../skills/nuelink-cli-setup/references/setup-workflow.md)

## Legacy Scope (Still Supported)

Use this skill when someone needs to:

- Install the Nuelink CLI
- Authenticate the CLI with an API key
- Verify where auth is loaded from
- Clear saved credentials

Reference: `./references/auth-flow.md`

## Requirements

- Node.js 18.17 or higher

## Install

### Global install

```bash
npm install -g @nuelink/nuelink-cli
```

### Run without global install

```bash
npx @nuelink/nuelink-cli --help
```

## Authentication

### Save API key for future commands

```bash
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
```

The `--api-key` global flag is runtime-only. To persist a key, use `auth:login --stdin` as shown above.

For shared or automated environments, prefer environment variables instead of persisted local config:

```bash
NUELINK_API_KEY=YOUR_API_KEY nuelink-cli auth:status
```

### Check auth status

```bash
nuelink-cli auth:status
```

### Clear saved API key

```bash
nuelink-cli auth:clear
```

## Auth Resolution Order

The CLI resolves credentials in this order:

1. `--api-key <api_key>` CLI flag
2. `NUELINK_API_KEY` environment variable
3. Saved config file

## Config Storage Path

- Windows: `%USERPROFILE%/.nuelink-cli/config.json`
- macOS/Linux: `$HOME/.nuelink-cli/config.json`

Example file:

```json
{
  "apiKey": "..."
}
```

## Quick Verification Flow

```bash
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli me
```

## Safety Notes

- Do not echo raw API keys in logs, screenshots, or chat transcripts.
- Prefer temporary shell environment variables in CI.
- If a key may have leaked, rotate it before continuing.
