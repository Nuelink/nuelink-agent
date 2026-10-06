# Nuelink MCP Distribution Runbook

This repository contains the plugin metadata and review cases used to distribute the production Nuelink MCP server. The canonical endpoint is `https://mcp.nuelink.com/mcp` and the 17 published tool names are treated as a stable API contract.

## Canonical Listing Metadata

| Field | Value |
| --- | --- |
| Display name | Nuelink |
| Publisher | Nuelink |
| MCP endpoint | `https://mcp.nuelink.com/mcp` |
| Product page | `https://nuelink.com/social-media-api` |
| Documentation | `https://docs.nuelink.com` |
| Support | `https://help.nuelink.com` |
| Privacy | `https://nuelink.com/privacy` |
| Terms | `https://nuelink.com/terms` |
| Contact | `support@nuelink.com` |

Use the same name, descriptions, URLs, and icon across directories so users see one product identity.

## Prepared Artifacts

- Official MCP Registry: `../nuelink-cf-mcp-demo/server.json`
- Claude plugin bundle: `.claude-plugin/plugin.json`, `.mcp.json`, and `skills/`
- ChatGPT and Codex directory package: `.codex-plugin/plugin.json`, `.mcp.json`, `assets/`, and `skills/`
- OpenAI review set: exactly five positive and three negative cases in `.codex-plugin/plugin.json`
- Directory icon: `assets/nuelink.png` (the same 512×512 PNG used by the MCP Registry listing)

Run `npm run validate:all` before packaging. The contract validator checks manifest versions, required HTTPS listing URLs, icon paths, the production MCP endpoint, and review-case counts.

## Tool Annotation Justifications

| Tool group | Read-only | Destructive | Open world | Justification |
| --- | --- | --- | --- | --- |
| Validate, get, and list tools | Yes | No | No | They only read data available inside the authenticated Nuelink account. |
| Create collection and upload media | No | No | No | They add reversible resources inside the connected account. |
| Create automation | No | No | Yes | It creates account state and may fetch content from a public feed URL. |
| Create or schedule a post | No | Yes | Yes | Some modes publish content to public social platforms; draft is the default. |
| Delete post | No | Yes | No | It permanently deletes account data but does not contact an open-ended external destination. |

These are tool-level declarations, so the most consequential supported mode determines the annotation. For example, post creation remains destructive even though an omitted `publishMode` safely defaults to `DRAFT`, because the same tool also supports `IMMEDIATE` publication.

## Human-Gated Release Steps

Code preparation cannot complete account, domain, or reviewer actions. A Nuelink administrator must complete these steps:

1. Deploy the MCP server changes and run `npm run test:oauth-acceptance` against production. Confirm OAuth discovery advertises CIMD support and the complete sign-in, refresh, and revocation flow passes.
1. Remove the public "Alpha" and "OAuth not certified" notices only after Nuelink formally declares the integration stable. Directory reviewers can reject trial or demo integrations.
1. For the Official MCP Registry, create the registry signing key, publish the required `nuelink.com` DNS TXT record, run `mcp-publisher validate server.json`, authenticate the domain namespace, and publish `com.nuelink/mcp`.
1. For Claude, submit the production URL as an MCP connector and submit this repository as the plugin bundle. Use a seeded review workspace.
1. For ChatGPT and Codex, complete Nuelink business verification, upload the package, verify the server domain, connect OAuth, and scan all tools. Add a reviewer-accessible demo recording URL in the dashboard or as `extensions.com.openai.review.demo_recording_url` before final submission.
1. Enter reviewer credentials only in each directory's secure form. Use a dedicated, seeded account that does not require two-factor authentication, email codes, or additional setup.
1. Submit to Muse after the same production OAuth test passes.

Do not place signing keys, OAuth client secrets, API keys, reviewer passwords, or test-account credentials in this repository.

## Recommended Submission Order

1. Official MCP Registry
1. Claude MCP connector
1. ChatGPT and Codex plugin directory
1. Muse
1. Claude plugin bundle
1. Cursor, Gemini CLI, Smithery, Glama, Cline, ClawHub, Hermes, Docker MCP catalog, Perplexity, Manus, and community lists

Many downstream catalogs ingest the Official MCP Registry. Search each catalog for `com.nuelink/mcp` before creating a duplicate manual entry.
