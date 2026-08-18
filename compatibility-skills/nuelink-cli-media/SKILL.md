---
name: nuelink-cli-media
description: List media assets or safely upload local files to a brand media library with nuelink-cli. Verify the brand and file path, preview the upload, and require explicit confirmation.
---

# Nuelink CLI Media

Compatibility alias: this flow is now consolidated under `nuelink-cli-manage`.

## How To Use

Use this alias when you need media inventory or a file upload tied to one brand.

```bash
nuelink-cli media --brand-id BRAND_ID --type IMAGE
nuelink-cli media:upload --brand-id BRAND_ID --file ./assets/image.jpg --dry-run
```

## Alias Routing

- Primary skill: `nuelink-cli-manage`
- Primary reference: [manage workflow](../../skills/nuelink-cli-manage/references/manage-workflow.md)

Use this skill to manage media assets in a brand.

Reference: `./references/media-workflow.md`

## Mutation Safety Workflow

1. Resolve and confirm one `BRAND_ID`.
2. Validate local file path exists before upload.
3. Run the upload command with `--dry-run` and show the validated file metadata and target brand.
4. Require explicit intent before running `media:upload`.
5. Run the same command without `--dry-run`, then return the media ID for downstream post creation.

## List Media

```bash
nuelink-cli media --brand-id SAMPLE_BRAND_ID --type IMAGE
```

## Upload Media

```bash
nuelink-cli media:upload --brand-id SAMPLE_BRAND_ID --file ./assets/image.jpg --dry-run
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
- Listing optionally accepts `--type IMAGE|VIDEO|GIF|APPLICATION|DOCUMENT|CSV`.
- `media:upload` requires a valid local file path.
- Increase timeout for large files with `NUELINK_TIMEOUT_MS`.
