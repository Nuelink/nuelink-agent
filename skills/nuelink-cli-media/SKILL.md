---
name: nuelink-cli-media
description: List brand media and upload local media files.
---

# Nuelink CLI Media

Use this skill to manage media assets in a brand.

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
