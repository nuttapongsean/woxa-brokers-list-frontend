# Woxa Brokers List — Frontend

Institutional broker listing platform with a dark-navy "Sterling Midnight" terminal aesthetic. Built as a full-stack developer assessment project.

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| i18n | next-intl (`/en`, `/th`) |
| API client | Axios with interceptors |
| Auth | HTTP-only cookies (set by backend) |
| SEO | Next.js Metadata API + JSON-LD |

## Getting Started

### Prerequisites

- Node.js 20+
- A running backend at `http://localhost:4000` (or update `NEXT_PUBLIC_API_URL`)

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/en/brokers`.

## Available Scripts

```bash
npm run dev          # development server (http://localhost:3000)
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Project Structure

```
app/
  [locale]/
    brokers/           # Broker list, detail, and submit pages
    login/
    register/
components/
  brokers/             # Broker-specific components
  forms/               # Login, Register, SubmitBroker forms
  layout/              # Navbar, Footer
  ui/                  # Primitive components (Button, Input, Badge, Card)
  seo/                 # JsonLd structured data
lib/
  api/                 # Axios client + broker/auth API functions
  query/               # TanStack Query keys and provider
  schemas/             # Zod schemas for API responses
messages/
  en.json              # English translations
  th.json              # Thai translations
hooks/                 # useBrokers, useBroker, useAuth
middleware.ts          # next-intl locale routing + protected routes
```

## Pages

| Route | Description |
|---|---|
| `/[locale]/brokers` | Broker list with search and category filters |
| `/[locale]/brokers/[slug]` | Broker detail with metrics, markets, and contact |
| `/[locale]/brokers/submit` | Submit a new broker (protected) |
| `/[locale]/login` | Login |
| `/[locale]/register` | Register |

## Architecture Notes

- **Server Components by default** — `'use client'` only for hooks/event handlers.
- Broker list uses RSC `fetch` for SSR/SEO, then React Query for client-side filtering. Filters and search are purely client-side (no refetch).
- Broker detail uses `generateStaticParams` for SSG + `generateMetadata` for dynamic SEO.
- Protected routes are enforced in `middleware.ts`, not client-side guards.
- Auth tokens live in HTTP-only cookies — never `localStorage`.
- All user-facing strings go through `useTranslations()` — no hardcoded English in components.

## Design System

Colors are defined as CSS variables in `app/globals.css` and referenced via Tailwind semantic class names. No arbitrary hex values in components.

```
Background:  #070d1a (page)  #0d1829 (card)  #0f1e33 (input)
Border:      #1b2f4e (default)  #243d60 (hover)
Text:        #e8f0fe (primary)  #7a9cc0 (muted)  #4a6a8a (dim)
Accent:      #4a9eff (blue)  #2563eb (dark blue)
Positive:    #34d399 (green)
```
