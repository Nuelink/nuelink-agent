---
name: nuelink-cli-install-auth
description: Install the Nuelink CLI and configure authentication using --auth, NUELINK_API_KEY, or saved config.
---

# Nuelink CLI Install And Auth

Use this skill when someone needs to:

- Install the Nuelink CLI
- Authenticate the CLI with an API key
- Verify where auth is loaded from
- Clear saved credentials

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
nuelink-cli --auth YOUR_API_KEY
```

The `--auth` value is persisted to local user config.

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

1. `--auth <api_key>` CLI flag
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
nuelink-cli --auth YOUR_API_KEY
nuelink-cli auth:status
nuelink-cli me
```
