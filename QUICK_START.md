# Quick Start

This guide gets you from zero to first successful Nuelink CLI calls with the skills pack.

## 1. Install The Skill Pack

```bash
npx --yes skills@1.5.22 add Nuelink/nuelink-agent
```

## 2. Install The Nuelink CLI

The CLI requires Node.js 18.17 or later. The Skill repository's development
scripts require Node.js 20 or later.

```bash
npm install -g @nuelink/nuelink-cli@1.5.0
```

## 3. Authenticate

```bash
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
```

For CI and automation, inject the key from the platform's secret manager, keep
it out of logs and command arguments, and limit child-process inheritance:

```bash
nuelink-cli auth:status
```

## 4. First Commands

```bash
nuelink-cli me
nuelink-cli brands --per-page 5 --page 1
nuelink-cli --json brands --per-page 5 --page 1
```

## 5. Try A Full Workflow

```bash
nuelink-cli collections --brand-id SAMPLE_BRAND_ID --per-page 5 --page 1
nuelink-cli channels --brand-id SAMPLE_BRAND_ID --per-page 5 --page 1
nuelink-cli posts --brand-id SAMPLE_BRAND_ID --collection-id SAMPLE_COLLECTION_ID
```

For create flows, apply this safety order:

1. Resolve target IDs (`brands`, `collections`, `channels`).
2. Validate payload and publish mode.
3. Use `DRAFT` when publish intent is unclear.
4. Ask for explicit confirmation before queue, schedule, immediate publish, upload, or automation creation.
5. For scheduling, display and confirm the brand's timezone and exact local time; ensure it is at least 10 minutes in the future.
6. After a mutation, read the resource back and verify the returned ID and exposed status fields. Allow processing time before concluding a new media upload is missing.

## 6. Use Example Payloads

- Browse examples in [examples/](examples)
- Placeholder tokens are documented in [examples/README.md](examples/README.md)
- Replace tokens with your own IDs before running requests

## 7. Validate Local Docs Changes

```bash
npm run lint:md
npm run validate
```
