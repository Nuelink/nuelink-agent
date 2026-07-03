# API Endpoints Reference

These are the public API endpoint patterns used by the current skill set.

## Profile

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/me` | `GET` | Get current authenticated profile |

## Brands

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands` | `GET` | List brands |

## Collections

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/collections` | `GET` | List collections |
| `/api/public/v1/brands/:brand_id/collections` | `POST` | Create collection |

## Automations

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/automations` | `GET` | List automations |
| `/api/public/v1/brands/:brand_id/automations` | `POST` | Create automation |

## Channels

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/channels` | `GET` | List channels |

## Media

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/media` | `GET` | List media |
| `/api/public/v1/brands/:brand_id/media` | `POST` | Upload media |

## Posts

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/posts` | `GET` | List posts |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/posts` | `POST` | Create post |

## Notes

- Path and query arguments vary by command flags.
- Example payloads and responses are in [examples/](examples).
