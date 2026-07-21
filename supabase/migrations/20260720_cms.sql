-- CMS tables: projects + site_content, storage bucket for admin uploads.
-- Auth model: a single admin account (email+password, signups disabled in
-- dashboard). anon = public visitors; authenticated = Patrick.

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  payload jsonb not null,
  domain text not null check (domain in ('marketing', 'ux', 'product', 'ventures', 'creative')),
  tier int not null default 2 check (tier between 1 and 3),
  published boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "public read published projects"
  on public.projects for select to anon
  using (published);

create policy "admin read all projects"
  on public.projects for select to authenticated
  using (true);

create policy "admin write projects"
  on public.projects for all to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- site_content (key/value jsonb: getexpanded, content_channel, site, live_stats)
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "public read site content"
  on public.site_content for select to anon
  using (true);

create policy "admin read site content"
  on public.site_content for select to authenticated
  using (true);

create policy "admin write site content"
  on public.site_content for all to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- keep updated_at fresh
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists site_content_touch on public.site_content;
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- storage: admin image uploads (public read, admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "public read site-media"
  on storage.objects for select to anon
  using (bucket_id = 'site-media');

create policy "admin manage site-media"
  on storage.objects for all to authenticated
  using (bucket_id = 'site-media') with check (bucket_id = 'site-media');
