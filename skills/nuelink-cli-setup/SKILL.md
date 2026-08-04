---
name: nuelink-cli-setup
description: Use when a user asks to install nuelink-cli, authenticate, verify active identity, or troubleshoot auth/config.
triggers: install nuelink cli, login, set api key, auth status, me, clear auth, ci auth setup
boundaries: Setup and diagnostics only; do not create collections, automations, uploads, or posts.
safety: Never print full API keys and prefer NUELINK_API_KEY for automation.
---

# Nuelink CLI Setup

Use this skill for installation, authentication, identity verification, and operational readiness checks.

Reference: `./references/setup-workflow.md`

## Core Workflow

```bash
npm install -g @nuelink/nuelink-cli
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
nuelink-cli me
```

## CI-Safe Workflow

```bash
export NUELINK_API_KEY="YOUR_API_KEY"
nuelink-cli auth:status
nuelink-cli --json brands --per-page 5 --page 1
```

## Guardrails

- Never echo full API keys in logs.
- If profile/account is unexpected, stop before any mutation workflow.
- If auth seems stale, use `auth:clear` and re-authenticate.
