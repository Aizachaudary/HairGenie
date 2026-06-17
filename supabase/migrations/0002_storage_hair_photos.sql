-- HairGenie storage: private "hair-photos" bucket with per-user folder access.
-- Objects are stored as `${user_id}/${filename}`; policies key off that first
-- path segment so each user can only see and manage their own photos.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

insert into storage.buckets (id, name, public)
values ('hair-photos', 'hair-photos', false)
on conflict (id) do nothing;

create policy "Users can view their own hair photos"
  on storage.objects for select
  using (bucket_id = 'hair-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can upload their own hair photos"
  on storage.objects for insert
  with check (bucket_id = 'hair-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own hair photos"
  on storage.objects for update
  using (bucket_id = 'hair-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own hair photos"
  on storage.objects for delete
  using (bucket_id = 'hair-photos' and (storage.foldername(name))[1] = auth.uid()::text);
