---
name: nuelink-cli-setup
description: Install nuelink-cli, authenticate, verify identity, or troubleshoot auth/config. Use for setup and diagnostics only; never print full API keys, prefer NUELINK_API_KEY in automation, and do not mutate Nuelink resources.
---

# Nuelink CLI Setup

Use this skill for installation, authentication, identity verification, and operational readiness checks.

Read [the setup workflow](references/setup-workflow.md) for auth troubleshooting and operational checks.

## How To Use

Use this skill first when you need to install the CLI or confirm which account is active.

The CLI requires Node.js 18.17 or later. The Agent Skills repository's development
scripts require Node.js 20 or later. Install the fixed CLI release explicitly;
older versions do not preserve nullable JSON fields or enforce trusted API hosts.

```bash
npm install -g @nuelink/nuelink-cli@1.5.0
nuelink-cli --version
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli auth:validate
nuelink-cli me
```

## Core Workflow

```bash
npm install -g @nuelink/nuelink-cli@1.5.0
nuelink-cli --version
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli auth:validate
nuelink-cli me
```

## CI-Safe Workflow

Provide `NUELINK_API_KEY` through the CI platform's secret manager. Do not print
environment variables or pass the key as a command-line argument. Limit which
steps and child processes inherit the secret.

```bash
nuelink-cli auth:status
nuelink-cli auth:validate
nuelink-cli --json brands --per-page 5 --page 1
```

## When To Stop

- Stop if `nuelink-cli me` shows the wrong account.
- Stop if `auth:status` fails and credentials need to be reset.
- Hand off to `nuelink-cli-manage` or `nuelink-cli-publish` after setup is confirmed.

## Guardrails

- Never echo full API keys in logs.
- If profile/account is unexpected, stop before any mutation workflow.
- If auth seems stale, use `auth:clear` and re-authenticate.
