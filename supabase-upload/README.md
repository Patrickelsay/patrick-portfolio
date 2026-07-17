# Upload these to Supabase Storage

Bucket: `portfolio-media` (public). Keep the folder structure flat — the site expects:

- `bts-story-highlight.mp4`
- `client-results-highlight.mp4`
- `waf-film.mp4`

(i.e. strip the `remote/` prefix; the site builds URLs as
`<SUPABASE_URL>/storage/v1/object/public/portfolio-media/<name>.mp4`.)

Dashboard → Storage → New bucket → name `portfolio-media`, check **Public** → upload the three
mp4s from this folder. Their poster frames already ship with the site.
