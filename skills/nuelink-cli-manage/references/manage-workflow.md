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
- Resolve and validate collection, channel, queue, and automation IDs before update or delete actions.
- Run the final mutation command with `--dry-run`, show the validated payload, and ask for explicit confirmation before execution.
- Re-run without `--dry-run` after confirmation.
- Read the created collection or automation back by ID/listing and compare its returned ID and visible settings with the requested values. The automation listing may omit some import options; do not claim those persisted values were verified when they are not returned.
- After upload, retry read-only media listing with a reasonable delay if the new ID is not immediately visible; uploads can remain in processing before appearing.
- If a mutation times out or returns a server error, inspect the relevant list/read endpoint before retrying; do not resend a create blindly because the first request may have succeeded.
