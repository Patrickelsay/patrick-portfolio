-- Contact form messages — insert-only for the anon key, read for service role only.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) <= 4000),
  source_page text
);

alter table public.contact_messages enable row level security;

-- anyone may submit a message; nobody (anon) may read, update, or delete
create policy "anon can insert contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);
