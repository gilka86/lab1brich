create table public.categories (
  id text primary key,
  name text not null unique,
  constraint categories_id_not_blank
    check (id = btrim(id) and id <> ''),
  constraint categories_name_not_blank
    check (name = btrim(name) and name <> '')
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null references public.categories(id)
    on update cascade on delete restrict,
  title text not null,
  description text not null default '',
  status text not null,
  created_date date not null,
  note_time time,
  priority text not null,
  rating smallint,
  created_at timestamptz not null default now(),
  constraint notes_title_length
    check (char_length(btrim(title)) between 3 and 100),
  constraint notes_status_allowed
    check (status in ('active', 'completed', 'archived')),
  constraint notes_priority_allowed
    check (priority in ('low', 'medium', 'high')),
  constraint notes_rating_range
    check (rating is null or rating between 1 and 5),
  constraint notes_completed_has_description
    check (status <> 'completed' or char_length(btrim(description)) > 0)
);

alter table public.categories enable row level security;
alter table public.notes enable row level security;

revoke all on table public.categories from anon, authenticated;
revoke all on table public.notes from anon, authenticated;

grant select on table public.categories to anon, authenticated;

create policy "categories are publicly readable"
on public.categories
for select
to anon, authenticated
using (true);