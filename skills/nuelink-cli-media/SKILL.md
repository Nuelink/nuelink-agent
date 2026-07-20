---
name: nuelink-cli-media
description: Use when a user asks to list media assets or upload local files to a brand media library.
triggers: list media, upload image, upload video, get media id for post
boundaries: Media list/upload via nuelink-cli only.
safety: Verify brand target, check local file path, and require explicit upload confirmation.
---

# Nuelink CLI Media

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Reference: `../nuelink-cli-manage/references/manage-workflow.md`

Use this skill to manage media assets in a brand.

Reference: `./references/media-workflow.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID`.
2. Validate local file path exists before upload.
3. Show upload command and target brand for confirmation.
4. Require explicit intent before running `media:upload`.
5. Return media ID from the upload response for downstream post creation.

## List Media

```bash
nuelink-cli media --brand-id 13493
```

## Upload Media

```bash
nuelink-cli media:upload --brand-id 13493 --file ./assets/image.jpg
```

## Examples

- Upload success response: `examples/media/upload.response.json`
- List response payload: `examples/media/list.response.json`

## Expected API Results

- List endpoint: `GET /api/public/v1/brands/:brand_id/media`
- Upload endpoint: `POST /api/public/v1/brands/:brand_id/media`
- Success codes: `200` for list, `201` for upload

## Notes

- `--brand-id` is required for both commands.
- `media:upload` requires a valid local file path.
- Increase timeout for large files with `NUELINK_TIMEOUT_MS`.
