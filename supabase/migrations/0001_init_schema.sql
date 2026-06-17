-- HairGenie initial schema: profiles, routines, progress_logs, hair_photos
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text,
  hair_type text check (hair_type in ('straight', 'wavy', 'curly', 'coily')),
  hair_condition text check (hair_condition in ('dry', 'oily', 'normal', 'damaged')),
  scalp_condition text check (scalp_condition in ('dandruff', 'itchy', 'healthy')),
  concerns text[] not null default '{}',
  sleep_quality text check (sleep_quality in ('poor', 'fair', 'good', 'excellent')),
  stress_level text check (stress_level in ('low', 'moderate', 'high', 'severe')),
  location text,
  water_type text check (water_type in ('hard', 'soft')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.concerns is
  'Subset of: hair_fall, frizz, thinning, split_ends';

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = user_id);

create policy "Profiles are deletable by owner"
  on public.profiles for delete
  using (auth.uid() = user_id);

-- Keep updated_at current on every profile change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Auto-create a blank profile row whenever a new auth user signs up, so the
-- app never has to special-case "no profile yet" vs "profile not loaded".
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- routines
-- ---------------------------------------------------------------------------
create table if not exists public.routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6), -- 0 = Monday
  task text not null,
  completed boolean not null default false,
  week_start_date date not null,
  created_at timestamptz not null default now()
);

create index if not exists routines_user_week_idx
  on public.routines (user_id, week_start_date);

alter table public.routines enable row level security;

create policy "Routines are viewable by owner"
  on public.routines for select
  using (auth.uid() = user_id);

create policy "Routines are insertable by owner"
  on public.routines for insert
  with check (auth.uid() = user_id);

create policy "Routines are updatable by owner"
  on public.routines for update
  using (auth.uid() = user_id);

create policy "Routines are deletable by owner"
  on public.routines for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- progress_logs
-- ---------------------------------------------------------------------------
create table if not exists public.progress_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  hair_fall_level smallint not null check (hair_fall_level between 0 and 10),
  frizz_level smallint not null check (frizz_level between 0 and 10),
  logged_at timestamptz not null default now()
);

create index if not exists progress_logs_user_logged_idx
  on public.progress_logs (user_id, logged_at desc);

alter table public.progress_logs enable row level security;

create policy "Progress logs are viewable by owner"
  on public.progress_logs for select
  using (auth.uid() = user_id);

create policy "Progress logs are insertable by owner"
  on public.progress_logs for insert
  with check (auth.uid() = user_id);

create policy "Progress logs are updatable by owner"
  on public.progress_logs for update
  using (auth.uid() = user_id);

create policy "Progress logs are deletable by owner"
  on public.progress_logs for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- hair_photos
-- ---------------------------------------------------------------------------
create table if not exists public.hair_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  image_url text not null,
  photo_type text not null check (photo_type in ('before', 'after', 'progress')),
  notes text,
  taken_at timestamptz not null default now()
);

create index if not exists hair_photos_user_taken_idx
  on public.hair_photos (user_id, taken_at desc);

alter table public.hair_photos enable row level security;

create policy "Hair photos are viewable by owner"
  on public.hair_photos for select
  using (auth.uid() = user_id);

create policy "Hair photos are insertable by owner"
  on public.hair_photos for insert
  with check (auth.uid() = user_id);

create policy "Hair photos are updatable by owner"
  on public.hair_photos for update
  using (auth.uid() = user_id);

create policy "Hair photos are deletable by owner"
  on public.hair_photos for delete
  using (auth.uid() = user_id);
