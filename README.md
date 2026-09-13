# HairGenie

An AI-personalized haircare platform: a hair profile quiz, a personalized weekly routine,
curated product picks with DIY alternatives, and progress tracking with metrics, trend charts,
and before/after photos.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Supabase (Auth, Postgres, Storage)
- Recharts
- Deployed on Vercel

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Create a free project at [supabase.com](https://supabase.com). Once it's ready, open the
**SQL Editor** and run each migration in `supabase/migrations/` in order:

1. `0001_init_schema.sql` — creates `profiles`, `routines`, `progress_logs`, and `hair_photos`
   with row-level security policies, plus a trigger that creates a blank profile row whenever
   someone signs up.
2. `0002_storage_hair_photos.sql` — creates a **private** `hair-photos` storage bucket and RLS
   policies so each user can only read/write objects under their own `${user_id}/...` folder.
   Confirm it worked under **Storage** in the dashboard — you should see a `hair-photos` bucket
   marked private.
3. `0003_profile_reminders.sql` — adds the `reminders_enabled` preference used by the Routine
   page's reminders toggle.

Then:

4. Open **Project Settings -> API** and copy the **Project URL** and **anon public key**.
5. Open **Authentication -> URL Configuration** and add your site URL (and
   `http://localhost:3000` for local dev) to **Site URL** and **Redirect URLs**, so the
   email-confirmation and password-reset links work (`/auth/callback` is appended
   automatically by the app).

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from step 2, and set
`NEXT_PUBLIC_SITE_URL` to `http://localhost:3000` for local development.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    (marketing)/        Public landing page
    (auth)/              Login, signup, forgot/reset password
    (app)/               Protected routes: dashboard, routine, products, progress
    onboarding/           7-step hair profile wizard (own full-screen layout)
    auth/callback/        Supabase auth code exchange (email links)
    icon.tsx, apple-icon.tsx,
    opengraph-image.tsx, twitter-image.tsx   Branded favicon + social preview images
    robots.ts, sitemap.ts                     SEO metadata routes
  components/
    ui/                  shadcn/ui primitives
    layout/              Navbar, footer, app topbar, logo, nav links
    marketing/           Landing page sections
    auth/                Auth forms
    onboarding/          Wizard steps + selectable option cards
    dashboard/           Dashboard widgets (score, routine, tips, reminder banner)
    routine/             Week grid, completion tracker, hair myths, reminders toggle
    products/            Product card
    progress/            Camera capture, upload flow, gallery, before/after, metrics
    theme-toggle.tsx     Light/dark/system theme switcher
    reveal.tsx           Scroll-triggered entrance animation wrapper
  lib/
    supabase/            Browser/server Supabase clients + middleware helper
    actions/             Server actions (auth, onboarding, routines, photos, progress)
    validations/         Zod schemas
    routines/            Weekly routine generator + week/date helpers
    products/            Product recommendation ranking
    storage/             Storage bucket name + path helpers
    image/               Client-side photo compression
    content/             Curated tip and hair-myth content
    scoring.ts           Hair health score calculation
  types/database.ts      Hand-written types matching the Supabase schema
supabase/migrations/      SQL schema, RLS policies, and storage bucket setup
```

## Deployment (Vercel)

1. Push this repo to GitHub (it isn't connected to a remote yet — create one and push it, or
   ask your assistant to do it for you).
2. Import it into [Vercel](https://vercel.com/new) — it auto-detects Next.js, so no custom
   build configuration is needed.
3. Add the same environment variables from `.env.example` in the Vercel project settings,
   setting `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Add that production URL to the Supabase **Redirect URLs** list (step 2.5 above).
5. Deploy.

## Notes on scope

A few  deliberate scoping decisions worth knowing about before you extend this further:

- The Routine page's "daily reminders" toggle is a real, persisted preference, but there's no
  push notification or email delivery behind it — enabling it surfaces an in-app banner on the
  dashboard when today's routine isn't finished. Real push notifications would need a service
  worker, VAPID keys, and a scheduled job.
- The Dashboard's "weather tip" is a water-type/climate tip derived from the user's profile,
  not a live weather API call.
- The product catalog uses generic, descriptive product names rather than real brand names —
  ratings and prices are illustrative, not sourced from a live retailer.
