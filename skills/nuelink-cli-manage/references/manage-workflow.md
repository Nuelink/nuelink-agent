# Manage Workflow Reference

## Resource Discovery

```bash
nuelink-cli --json brands --per-page 25 --page 1
nuelink-cli --json collections --brand-id BRAND_ID --per-page 25 --page 1
nuelink-cli --json channels --brand-id BRAND_ID --per-page 25 --page 1
```

## Mutation Guardrails

- Stop on ambiguous brand or collection matches.
- Validate required fields before create actions.
- Show final command and ask for explicit confirmation before execution.
