
alter table public.notes
  alter column owner_id set default auth.uid();

revoke all on table public.notes from anon, authenticated;

grant select, insert, update, delete
  on table public.notes to authenticated;

create policy "notes select own"
on public.notes for select to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "notes insert own"
on public.notes for insert to authenticated
with check ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "notes update own"
on public.notes for update to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id)
with check ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "notes delete own"
on public.notes for delete to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);
