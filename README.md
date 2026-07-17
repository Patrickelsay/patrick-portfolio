# patrick-portfolio

Personal portfolio for Patrick El-Sayegh — React + Vite SPA, light shell with dark media rooms.
Content/marketing reels, UX/UI, industrial design case studies, GetExpanded, and creative work.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production bundle in dist/
npm run preview    # serve the production build locally
```

`.env` (optional — copy `.env.example`): Supabase creds for the contact form and remote videos.
Without them the form falls back to `mailto:` and remote-video sections hide.

## Content model

- `src/content/projects/*.ts` — one object per project, block-based sections rendered by
  `BlockRenderer`. `wobbly-bridge.ts` mirrors the authored
  `portfolio-assets/.../wobbly-bridge-content.md`; future `*-content.md` files convert the same way.
- `src/content/site.ts` — nav, hero copy, CTA. `about.ts` — the /about narrative (source of truth
  is `portfolio-assets/00-about-me/about-me-portfolio.md`). `content-channel.ts` — reels wall +
  client roster. `getexpanded.ts` — venture stats (update numbers as they grow).
- `src/content/media-index.json` — generated; do not edit by hand.

## Asset pipeline

Source of truth is `portfolio-assets/` (12.5 GB, **not** committed). Derived web assets land in
`public/media/` (committed, ~160 MB) so deploys never need the originals.

```bash
npm run assets:images   # manifest → webp renditions + og jpgs (sharp; HEIC via sips, PDFs via Swift)
npm run assets:video    # manifest → H.264 mp4s + posters (ffmpeg-static); remote tier → supabase-upload/
npm run assets          # both
```

Curation lives in `scripts/manifest.ts` — add an entry, re-run, reference the new id in content.
Scripts are idempotent; delete `public/media/<id>*` (and the id from `media-index.json`) to force
a rebuild of one asset.

## Supabase (one-time setup)

1. Run `supabase/migrations/20260717_contact_messages.sql` against your project
   (SQL editor or `supabase db push`). Insert-only RLS for anon; read via service role/dashboard.
2. Create a **public** storage bucket named `portfolio-media` and upload the files in
   `supabase-upload/` (keeps 100 MB of long compilations out of the repo).
3. Set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env` locally and in Coolify.

## Deploy (Coolify)

The repo ships a `Dockerfile` (node build → nginx with gzip, immutable asset caching, SPA
fallback, mp4 range support). In Coolify: new application → this repo → build pack “Dockerfile” →
set the two `VITE_*` env vars → deploy. No volumes needed.

## Verification tooling

- `scripts/shoot.ts` — Playwright (system Chrome) full-page screenshots of every route at
  390/834/1440 px: `npx tsx scripts/shoot.ts http://localhost:5173 /tmp/shots`
- `scripts/contact-sheet.ts` — numbered contact sheet of any asset folder (curation aid).
- `scripts/pdf-page.swift` — renders a PDF page to PNG (used by the image pipeline).
