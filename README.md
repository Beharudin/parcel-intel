# Parcel Intel — Real Estate Intelligence & CRM (Demo)

A demo dashboard built for the **Frontend Dashboard Developer / React Next.js** role at
914 Home Renovation. It mirrors the MVP screens from the job post — dashboard home,
property profiles, owner profiles, opportunity scoring, and a CRM activity timeline —
with the remaining screens (Contacts, Queues, CRM Timeline hub, Source Trace, Data
Quality, Reports, AI Assistant) wired up as "coming soon" stubs reachable from the
sidebar, so the full information architecture is visible even though only the core
flows are built out.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Recharts · lucide-react

All data lives in one file, `lib/data.ts`, as typed mock objects — no backend or
database required. Swapping it for a real API later just means replacing the
functions at the bottom of that file.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel (free)

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click Deploy.
   No environment variables or build config needed — Vercel detects Next.js automatically.
3. You'll get a live `*.vercel.app` URL to send along with your application.

## Before you send it

- **Logo:** replace `public/logo-placeholder.svg` with the real 914 Home Renovation
  logo (used in the sidebar). Any square SVG or PNG works — just keep the same file
  name or update the `src` in `components/Sidebar.tsx`.
- **Colors:** the palette is defined once in `tailwind.config.ts` under
  `theme.extend.colors` (`brand` = 914 orange `#FF6B00`, `survey` = confirmation green,
  `flag` = urgent red, `ink`/`parchment` = the dark base and light text). Adjust
  the hex values there if you want to match a refreshed brand kit later.
- **Copy:** page titles, empty states and the "coming soon" descriptions are all in
  `lib/nav.ts` and the individual `app/**/page.tsx` files if you want to tweak tone.

## What's built vs. stubbed

| Screen | Status |
| --- | --- |
| Dashboard home | Built — stats, opportunity trend, lead source mix, top opportunities, recent activity |
| Properties list + detail | Built — search, status filter, sortable columns, pagination, full property + owner + timeline view |
| Owners list + detail | Built — search, type filter, sortable columns, pagination, linked properties + timeline |
| Contacts, Opportunity Queues, CRM Timeline hub, Source Trace, Data Quality, Reports, AI Assistant | Stubbed "coming soon" screens, reachable from the sidebar, each describing what it will do |

## Project structure

```
app/                Route segments (App Router)
  page.tsx           Dashboard home
  properties/        Properties list + [id] detail
  owners/            Owners list + [id] detail
  contacts/, queues/, crm-timeline/, source-trace/,
  data-quality/, reports/, ai-assistant/   "Coming soon" stubs
components/         Shared UI (Sidebar, Topbar, tables, charts, stamp badge)
lib/data.ts         Single source of mock data + typed helpers
lib/nav.ts          Sidebar navigation config
```
