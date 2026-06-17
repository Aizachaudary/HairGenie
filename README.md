# HairGenie

An AI-personalized haircare platform: a hair profile quiz, a weekly routine, curated product
picks, and progress tracking with before/after photos.

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

Create a free project at [supabase.com](https://supabase.com). Once it's ready:

1. Open **SQL Editor** and run the contents of `supabase/migrations/0001_init_schema.sql`.
   This creates the `profiles`, `routines`, `progress_logs`, and `hair_photos` tables with
   row-level security policies, plus a trigger that creates a blank profile row whenever
   someone signs up.
2. Run `supabase/migrations/0002_storage_hair_photos.sql` in the same SQL Editor. This
   creates a **private** `hair-photos` storage bucket and row-level security policies so
   each user can only read/write objects under their own `${user_id}/...` folder. You can
   confirm it worked under **Storage** in the dashboard — you should see a `hair-photos`
   bucket marked private.
3. Open **Project Settings -> API** and copy the **Project URL** and **anon public key**.
4. Open **Authentication -> URL Configuration** and add your site URL (and
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
    (app)/               Protected routes (dashboard, progress, etc.)
    onboarding/           7-step hair profile wizard (own full-screen layout)
    auth/callback/        Supabase auth code exchange (email links)
  components/
    ui/                  shadcn/ui primitives
    layout/              Navbar, footer, app topbar, logo
    marketing/           Landing page sections
    auth/                Auth forms
    onboarding/          Wizard steps + selectable option cards
    dashboard/           Dashboard widgets (score, routine, tips)
    progress/            Camera capture, upload flow, gallery, before/after
  lib/
    supabase/            Browser/server Supabase clients + middleware helper
    actions/             Server actions (auth, onboarding, routines, photos)
    validations/         Zod schemas
    routines/            Weekly routine generator + week/date helpers
    storage/             Storage bucket name + path helpers
    image/               Client-side photo compression
    content/             Curated tip content
    scoring.ts           Hair health score calculation
  types/database.ts      Hand-written types matching the Supabase schema
supabase/migrations/      SQL schema, RLS policies, and storage bucket setup
```

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env.example` in the Vercel project settings,
   setting `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Add that production URL to the Supabase **Redirect URLs** list (step 2.3 above).
5. Deploy.
