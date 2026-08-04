# Quick Start

This guide gets you from zero to first successful Nuelink CLI calls with the skills pack.

## 1. Install The Skill Pack

```bash
npx skills add Nuelink/nuelink-agent
```

## 2. Install The Nuelink CLI

```bash
npm install -g @nuelink/nuelink-cli
```

## 3. Authenticate

```bash
printf '%s' "$NUELINK_API_KEY" | nuelink-cli auth:login --stdin
nuelink-cli auth:status
```

For CI and automation, prefer:

```bash
export NUELINK_API_KEY="YOUR_API_KEY"
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

## 6. Use Example Payloads

- Browse examples in [examples/](examples)
- Placeholder tokens are documented in [examples/README.md](examples/README.md)
- Replace tokens with your own IDs before running requests

## 7. Validate Local Docs Changes

```bash
npm run lint:md
npm run validate
```
