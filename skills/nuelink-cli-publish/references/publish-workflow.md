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
  "scheduledAt": "YYYY-MM-DD HH:mm:ss"
}
```

## Guardrails

- Resolve IDs before mutations.
- Resolve `scheduledAt` to a future date and time in the brand's timezone; never copy the placeholder literally.
- Run every upload or post mutation with `--dry-run` before requesting confirmation.
- If intent is ambiguous, default to `DRAFT`.
- Require explicit confirmation for `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
- After confirmation, re-run without `--dry-run`.
