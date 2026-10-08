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
  "scheduledAt": "BRAND_LOCAL_YYYY-MM-DD_HH:mm:ss"
}
```

## Guardrails

- Resolve IDs before mutations.
- Before scheduling, retrieve the selected brand and show its IANA timezone. Resolve the user's requested time in that timezone, show the exact local time and date, and get confirmation before execution. `scheduledAt` is brand-local; listed `postDate` values and post date filters are UTC.
- Scheduling requires a time at least 10 minutes in the future according to the server. Recheck the resolved time immediately before the confirmed request; do not silently move an expired or too-soon time.
- Never copy the placeholder literally or use a fixed calendar date in examples.
- Run every upload or post mutation with `--dry-run` before requesting confirmation.
- Use `schedule` and `brand-posts` to resolve the current state before moving or updating a queued or scheduled post.
- `posts:update --caption` changes the text of a non-poll, unpublished post without changing its media; captions must contain 1–3000 characters.
- If intent is ambiguous, default to `DRAFT`.
- Require explicit confirmation for `QUEUE`, `SCHEDULE`, and `IMMEDIATE`.
- Require explicit confirmation for `posts:update`; repeat the exact previewed command after confirmation.
- Require explicit confirmation for `posts:move`; confirm the brand, source and destination collection IDs, and every post ID. Moves are atomic, limited to 100 unique post IDs, and both collections must be in the same brand.
- After create/update, read the exact post back with its brand and post IDs and verify exposed status, post type, and schedule fields. Some accepted fields (including links, alt text, comments, and platform options) may not be included in list responses; do not claim those were independently verified.
- If the goal is only to stop a pending publication, prefer updating the post to `DRAFT`; do not delete it unless the user explicitly requested deletion.
- After media upload, allow for processing delay and retry a read-only media listing before treating the new upload as missing.
- If a post mutation times out or returns a server error, inspect the exact brand and collection/post read endpoints before retrying; do not resend a create blindly because the first request may have succeeded.
- Treat `posts:delete` as irreversible. Confirm the exact brand and post IDs immediately before running it without `--dry-run`.
- After confirmation, re-run without `--dry-run`.
