-- Adds a persisted reminders preference to profiles, used by the Routine
-- page toggle and the dashboard's in-app reminder nudge.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

alter table public.profiles
  add column if not exists reminders_enabled boolean not null default true;
