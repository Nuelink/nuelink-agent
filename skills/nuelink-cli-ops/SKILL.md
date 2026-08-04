---
name: nuelink-cli-ops
description: Use when a user asks for CI-safe JSON usage, timeout tuning, retries, or operational troubleshooting with nuelink-cli.
triggers: json mode, ci parsing, timeout tuning, rate limit handling, cli troubleshooting
boundaries: Operational command patterns only; does not replace resource-specific skills.
safety: Prefer machine-safe JSON output, avoid leaking secrets, and fail fast on auth/config issues.
---

# Nuelink CLI Ops

Compatibility alias: this flow is now consolidated under `nuelink-cli-setup`.

## Alias Routing

- Primary skill: `nuelink-cli-setup`
- Reference: `../nuelink-cli-setup/references/setup-workflow.md`

Use this skill for production-oriented CLI usage.

Reference: `./references/ops-patterns.md`

## JSON Output For Automation

```bash
nuelink-cli --json brands --per-page 25 --page 1
```

## Timeout Tuning

Default timeout is 30000ms. Override when needed:

```bash
NUELINK_TIMEOUT_MS=120000 nuelink-cli media --brand-id 13493
```

## Auth Troubleshooting

```bash
nuelink-cli auth:status
nuelink-cli auth:clear
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
```

## CI Pattern

- Store `NUELINK_API_KEY` in CI secrets.
- Prefer `--json` when downstream steps parse output.
- Keep `NUELINK_TIMEOUT_MS` explicit for long-running workflows.
- Treat command output as machine input only when stdout is valid JSON.
