# API Endpoints Reference

These are the public API endpoint patterns used by the current skill set.

Base URL: `https://app.nuelink.com/api/public/v1`. Every request uses
`Authorization: Bearer <token>`. List endpoints accept `page` (minimum `1`)
and `per_page` (`1` through `100`, default `25`).

## Profile

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/auth` | `GET` | Validate an API token and return its profile |
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
| `/api/public/v1/brands/:brand_id/collections/:collection_id` | `PATCH` | Update collection properties |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/channels` | `POST` | Add a channel assignment |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/channels/:channel_id` | `DELETE` | Remove a channel assignment |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/queues` | `POST` | Add a weekly queue slot |
| `/api/public/v1/brands/:brand_id/collections/:collection_id/queues/:queue_id` | `DELETE` | Delete a weekly queue slot |

## Automations

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/automations` | `GET` | List automations |
| `/api/public/v1/brands/:brand_id/automations` | `POST` | Create automation |
| `/api/public/v1/brands/:brand_id/automations/:automation_id` | `PATCH` | Pause or activate automation |

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
| `/api/public/v1/brands/:brand_id/posts` | `GET` | List posts across all brand collections |
| `/api/public/v1/brands/:brand_id/posts/move` | `PATCH` | Atomically move up to 100 posts between collections |
| `/api/public/v1/brands/:brand_id/posts/:post_id` | `PATCH` | Edit a caption; reschedule, re-queue, draft, or reposition a post |
| `/api/public/v1/brands/:brand_id/posts/:post_id` | `DELETE` | Permanently delete a post (sensitive action) |
| `/api/public/v1/brands/:brand_id/published-posts` | `GET` | List per-channel published results and engagement |

Post listing additionally accepts `view` (`QUEUE`, `SCHEDULED`, `DRAFT`, or
`PUBLISHED`), `status` (`PENDING`, `DRAFT`, `PUBLISHED`), `post_type`,
`posting_type`, `created_from`, `created_to`, `sort_by`, and `sort_order`.
Creation date filters use `YYYY-MM-DD HH:mm:ss` UTC timestamps; `created_to`
must not precede `created_from`.

Collection and brand post listings accept `view` (`QUEUE`, `SCHEDULED`,
`DRAFT`, or `PUBLISHED`). Brand post listing also accepts `collection_id`.
Published results accept status,
collection, channel, source post, type, text-search, publication-time, and
engagement-sort filters.

Moving posts requires source and destination collection IDs plus 1–100 unique
post IDs. Every post must belong to the source collection or the API moves none
of them.

## Schedule

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/public/v1/brands/:brand_id/schedule` | `GET` | Get the weekly queue schedule in the brand timezone |

## Notes

- Media listing additionally accepts `type`: `IMAGE`, `VIDEO`, `GIF`,
  `APPLICATION`, `DOCUMENT`, or `CSV`.
- Media uploads accept JPEG, PNG, BMP, MP4, MOV, or PDF files up to 100 MiB.
- Scheduled posts use `scheduledAt` in `YYYY-MM-DD HH:mm:ss` format.
- Post deletion requires the account setting that allows sensitive AI actions.
- Example payloads and responses are in [examples/](examples).
