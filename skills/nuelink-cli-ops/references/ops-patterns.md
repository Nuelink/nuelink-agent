# Ops Patterns Reference

## Clean JSON Mode

```bash
nuelink-cli --json brands --per-page 25 --page 1
```

## Timeout Override

```bash
NUELINK_TIMEOUT_MS=120000 nuelink-cli media --brand-id BRAND_ID
```

## Troubleshooting

```bash
nuelink-cli auth:status
nuelink-cli auth:clear
```

## Guardrail

- For automation pipelines, parse stdout only when output is strict JSON.
- Keep API keys in environment variables, never in logs.
