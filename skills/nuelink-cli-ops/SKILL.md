---
name: nuelink-cli-ops
description: Operational usage patterns for JSON output, timeout tuning, and auth troubleshooting.
---

# Nuelink CLI Ops

Use this skill for production-oriented CLI usage.

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
nuelink-cli --auth YOUR_API_KEY
```

## CI Pattern

- Store `NUELINK_API_KEY` in CI secrets.
- Prefer `--json` when downstream steps parse output.
- Keep `NUELINK_TIMEOUT_MS` explicit for long-running workflows.
