# Publish Workflow Reference

## Allowed Publish Modes

- `DRAFT`
- `QUEUE`
- `SCHEDULE`
- `IMMEDIATE`

## Scheduled Payload Template

```json
{
  "title": "Post title",
  "caption": "Post body",
  "publishMode": "SCHEDULE",
  "publishAt": "2026-08-01T16:00:00Z"
}
```

## Guardrails

- Resolve IDs before mutations.
- If intent is ambiguous, default to `DRAFT`.
- Require explicit confirmation for `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
