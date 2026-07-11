# Parcel Intel

Real estate intelligence and CRM dashboard for organizing property data, owner profiles, contacts, opportunity scoring, and acquisition workflows.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Dashboard** — network-wide stats, opportunity score trend, lead sources, top opportunities, and recent CRM activity
- **Properties** — searchable, filterable, sortable table with pagination and full property detail pages
- **Owners** — owner/company registry with contact status, data confidence, linked parcels, and CRM timeline
- **Workflow screens** — Contacts, Opportunity Queues, CRM Timeline, Source Trace, Data Quality, Reports, and AI Assistant (placeholders ready for expansion)

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | lucide-react |

Application data is typed and centralized in `lib/data.ts`, so the UI can later connect to a real API without rewriting screens.

## Requirements

- Node.js 18 or later
- npm 9 or later

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/parcel-intel.git
cd parcel-intel
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Deploy — no environment variables are required for the current setup.

## Project structure

```
app/                 App Router pages
  page.tsx           Dashboard
  properties/        Properties list and detail
  owners/            Owners list and detail
  contacts/          Contacts (coming soon)
  queues/            Opportunity queues (coming soon)
  crm-timeline/      CRM timeline hub (coming soon)
  source-trace/      Source trace (coming soon)
  data-quality/      Data quality (coming soon)
  reports/           Reports (coming soon)
  ai-assistant/      AI assistant (coming soon)
components/          Shared UI, tables, charts, layout shell
lib/data.ts          Typed data models and helpers
lib/nav.ts           Sidebar navigation config
public/logo.png      Brand logo
```

## Customization

- **Logo** — replace `public/logo.png` (keep the same filename)
- **Colors** — update tokens in `tailwind.config.ts` (`brand`, `survey`, `flag`, `ink`, `parchment`)
- **Navigation labels** — edit `lib/nav.ts`
- **Data** — edit or replace exports in `lib/data.ts`

## License

Private project. All rights reserved.
