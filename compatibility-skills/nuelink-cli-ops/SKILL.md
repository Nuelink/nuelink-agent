---
name: nuelink-cli-ops
description: Provide CI-safe JSON usage, timeout tuning, retries, and operational troubleshooting for nuelink-cli. Use for operational patterns, prefer machine-safe output, avoid secrets, and defer resource work to its specific skill.
---

# Nuelink CLI Ops

Compatibility alias: this flow is now consolidated under `nuelink-cli-setup`.

## How To Use

Use this alias when the request is about JSON output, CI behavior, or timeout handling.

```bash
nuelink-cli --json brands --per-page 25 --page 1
nuelink-cli auth:status
```

## Alias Routing

- Primary skill: `nuelink-cli-setup`
- Primary reference: [setup workflow](../../skills/nuelink-cli-setup/references/setup-workflow.md)

Use this skill for production-oriented CLI usage.

Reference: `./references/ops-patterns.md`

## JSON Output For Automation

```bash
nuelink-cli --json brands --per-page 25 --page 1
```

## Timeout Tuning

Default timeout is 30000ms. Override when needed:

```bash
NUELINK_TIMEOUT_MS=120000 nuelink-cli media --brand-id SAMPLE_BRAND_ID
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
