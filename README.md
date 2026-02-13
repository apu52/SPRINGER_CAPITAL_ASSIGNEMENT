# Sales Analytics Dashboard

A modern Next.js dashboard for visualizing and analyzing monthly sales performance across multiple years (2022, 2023, 2024).

## Overview

This project is a full-stack Next.js (App Router) application:
- Frontend dashboard UI with charts, metrics, filtering, and table summaries.
- Backend API route (`/api/sales`) that serves sales records.
- Shared TypeScript data model (`SalesRecord`) and mock dataset in `lib/data.ts`.

## Features

- Multi-year sales analytics dashboard (`/dashboard`)
- Revenue metrics:
  - Total revenue
  - Highest revenue month
  - Average monthly revenue
- Chart controls:
  - Chart type switch (bar/line/area via UI controls)
  - Year toggles (2022/2023/2024)
  - Revenue threshold filter
- API integration from frontend to backend (`fetch('/api/sales')`)
- Loading and error states with retry
- Responsive layout and reusable component architecture (atoms/molecules/organisms/templates)

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19 + Tailwind CSS + shadcn/ui style component set
- Charts: Recharts
- Package manager: pnpm

## Project Structure

```text
app/
  api/sales/route.ts        # Backend API endpoint
  dashboard/page.tsx        # Dashboard route
  layout.tsx                # Root layout and theme provider
  page.tsx                  # Redirects / -> /dashboard
components/
  pages/dashboard-page.tsx  # Main dashboard logic and rendering
  templates/                # Layout wrapper(s)
  organisms/                # Header, chart, sidebar, etc.
  molecules/                # Metric cards, selectors, filters
  atoms/                    # Typography and primitive pieces
  ui/                       # Reusable UI primitives
lib/
  data.ts                   # Sales data + SalesRecord type
  utils.ts                  # Shared helpers
```

## API

### `GET /api/sales`

Returns sales data in JSON format:

```json
{
  "data": [
    { "year": 2022, "month": "Jan", "revenue": 42500 }
  ]
}
```

Notes:
- The route currently serves mock data from `lib/data.ts`.
- A small simulated delay (~300ms) is included.

## Prerequisites

Install the following:
- Node.js 20+
- pnpm 10+

Check versions:

```bash
node -v
pnpm -v
```

## Local Setup (Full Run)

1. Go to project directory:

```bash
cd d:\Springer_Capital_Assignement
```

2. Install dependencies:

```bash
pnpm install
```

3. Start development server:

```bash
pnpm dev
```

4. Open in browser:
- `http://localhost:3000` (redirects to `/dashboard`)
- `http://localhost:3000/dashboard`
- `http://localhost:3000/api/sales`

## Production Run (Local)

```bash
pnpm build
pnpm start
```

## Available Scripts

- `pnpm dev` - Start dev server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Run production server
- `pnpm lint` - Run Next.js linting

## Environment Variables

No required environment variables are currently used by this codebase.

If you add env vars later:
- Create `.env.local` in project root.
- Restart the server after changes.

## Troubleshooting

### `pnpm` not recognized (Windows)

Install globally:

```bash
npm install -g pnpm
```

Then use:

```bash
pnpm -v
```

If PowerShell blocks `pnpm.ps1`, run the command through `pnpm.cmd`:

```bash
pnpm.cmd install
pnpm.cmd dev
```

### Port 3000 already in use

Run on another port:

```bash
pnpm dev -- -p 3001
```

Then open `http://localhost:3001`.

## Notes for Extending Backend

To connect real backend/data sources:
1. Replace mock `salesData` usage in `app/api/sales/route.ts` with DB/API calls.
2. Add required secrets to `.env.local`.
3. Validate and sanitize API inputs if query params are introduced.

## License

Private project (see `package.json`: `"private": true`).
