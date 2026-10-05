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
  "autoThreadText": null,
  "publishMode": "SCHEDULE",
  "scheduledAt": "YYYY-MM-DD HH:mm:ss"
}
```

## Guardrails

- Resolve IDs before mutations.
- Resolve `scheduledAt` to a future date and time in the brand's timezone; never copy the placeholder literally.
- Run every upload or post mutation with `--dry-run` before requesting confirmation.
- Use `schedule` and `brand-posts` to resolve the current state before updating a queued or scheduled post.
- If intent is ambiguous, default to `DRAFT`.
- Require explicit confirmation for `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
- Require explicit confirmation for `posts:update`; repeat the exact previewed command after confirmation.
- Treat `posts:delete` as irreversible. Confirm the exact brand and post IDs immediately before running it without `--dry-run`.
- After confirmation, re-run without `--dry-run`.
