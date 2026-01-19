# Blog Admin Plan

## Goals
- Move authoring to `admin.sakshambedi.com` with Supabase-backed storage.
- Keep writing in Markdown but allow block-level enhancements (wrapping images, callouts, code blocks).
- Publish only when ready; drafts remain private.

## Stack & Data Model
- Supabase: Auth + Postgres + Storage.
- Tables: `posts` (status draft/published, slug, title, summary, tags, body_md, body_html, published_at, updated_at, reading_time, excerpt), `media` (storage path, variants, alt/caption), optional `post_tags` join.
- Consider `revisions` table or JSON history column for undo/versioning.

## Editor Choice (Plate on Slate)
- Use Plate (Slate-based) with `@udecode/plate-markdown` for Markdown import/export so you keep MD as the source of truth.
- Enable block suite: slash menu, headings, lists, code blocks, callouts (custom node), images (with captions), tables.
- Keep the admin preview driven by the same Plate tree to avoid surprises when publishing.

## Admin Features
- Plate editor accepts pasted/uploaded Markdown and maps it to block nodes; block transforms available in the UI (callouts, media wrappers).
- Media manager for uploads and reuse; attach alt text and captions.
- Draft filter/search, slug generator, and reading time/excerpt precompute.

## Rendering Pipeline (Markdown → HTML)
- Store both Markdown (`body_md`) and rendered HTML (`body_html`) for the public site.
- Pipeline: `remark-parse` → `remark-gfm`/`remark-directive` + custom plugins → `remark-rehype` → `rehype-raw` (if needed) → `rehype-sanitize` → `rehype-stringify`, inserting classes/wrappers for layout.
- Re-render `body_html` at publish time (or on edit) to keep HTML in sync with `body_md` and plugin changes.

## Publishing & Preview
- Flow: Draft → preview link (signed) → publish. Published view filters on `published_at IS NOT NULL` (or status).
- Optionally pre-render HTML at publish time to avoid rendering on every page load.

## Auth & Security
- Supabase Auth with RLS: only your user_id can insert/update/delete drafts; anon has no access to drafts.
- Public site reads via view/RPC limited to published posts; no service-role keys on the client.

## Media Handling
- Store originals in Supabase Storage; generate multiple sizes + WebP/AVIF via edge function/worker; save variant metadata in `media`.
- Capture alt/caption on upload to enforce accessibility.

## Preview Parity
- Share the same renderer and styling between admin preview and public site to avoid surprises.

## Backups & Portability
- Optional nightly export or Git mirror of published posts (JSON/MD) for insurance.

## Next Steps
1) Define Supabase schema (posts, media, tags/revisions) and enable RLS policies.
2) Scaffold admin UI with Auth and Plate editor/preview (Markdown in/out via `@udecode/plate-markdown`).
3) Wire publish/preview flow and signed preview links, rendering HTML at publish time.
4) Add media upload with variant generation and metadata capture.
