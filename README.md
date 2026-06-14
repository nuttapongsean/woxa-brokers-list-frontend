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
| Auth | Access token in memory + refresh token in localStorage + session flag cookie |
| SEO | Next.js Metadata API + JSON-LD |
| Icons | lucide-react |

## Getting Started

### Prerequisites

- Node.js 20+

### Install

```bash
npm install
```

### Option 1 — Mock mode (no backend required)

All API calls return data from `lib/mock/data.ts`. Any email/password works for login and register.

```bash
echo "NEXT_PUBLIC_USE_MOCK=true" > .env.local
npm run dev
```

### Option 2 — With real backend

Make sure the backend is running first (see `woxa-brokers-list-backend/README.md`), then create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=false
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to `/en/login`.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/v1` | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Frontend origin (used for canonical URLs) |
| `NEXT_PUBLIC_USE_MOCK` | `false` | `true` = use local mock data, skip backend entirely |

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
    markets/           # Under maintenance
    analysis/          # Under maintenance
    education/         # Under maintenance
    privacy/
    terms/
    risk-disclosure/
    contact/
components/
  brokers/             # Broker-specific components
  forms/               # LoginForm, RegisterForm, SubmitBrokerForm
  layout/              # Navbar, Footer
  ui/                  # Button, Input, Badge, Card, UnderMaintenance
  seo/                 # JsonLd structured data
lib/
  api/                 # Axios client + broker/auth API functions
  query/               # TanStack Query keys and provider
  schemas/             # Zod schemas (auth includes agreeToTerms)
  mock/                # Mock broker data (used when NEXT_PUBLIC_USE_MOCK=true)
  config.ts            # App config, API URLs, image assets
messages/
  en.json              # English translations
  th.json              # Thai translations
hooks/                 # useBrokers, useBroker, useAuth
proxy.ts               # next-intl locale routing + auth guard (blocks non-public paths)
```

## Pages

| Route | Description |
|---|---|
| `/[locale]/brokers` | Broker list with search and category filters |
| `/[locale]/brokers/[slug]` | Broker detail with metrics, markets, and contact |
| `/[locale]/brokers/submit` | Submit a new broker (protected) |
| `/[locale]/login` | Login |
| `/[locale]/register` | Register (split layout: image panel + form) |
| `/[locale]/markets` | Under maintenance |
| `/[locale]/analysis` | Under maintenance |
| `/[locale]/education` | Under maintenance |
| `/[locale]/privacy` | Privacy policy |
| `/[locale]/terms` | Terms of service |
| `/[locale]/risk-disclosure` | Risk disclosure |
| `/[locale]/contact` | Contact |

## Architecture Notes

- **Server Components by default** — `'use client'` only for hooks/event handlers.
- Broker list uses RSC `fetch` for SSR/SEO, then React Query for client-side filtering. Filters and search are purely client-side (no refetch).
- Broker detail uses `generateStaticParams` for SSG + `generateMetadata` for dynamic SEO.
- Protected routes are enforced in `proxy.ts` via the `woxa_session` session-flag cookie. All paths except those in `publicPaths` (`lib/config.ts`) redirect to `/login` when unauthenticated.
- Access token lives in memory (XSS-safe, cleared on hard refresh); refresh token is in `localStorage`; a plain `woxa_session` cookie signals login state to the middleware.
- All user-facing strings go through `useTranslations()` — no hardcoded English in components.
- Under-maintenance pages share the `<UnderMaintenance>` component (`components/ui/UnderMaintenance.tsx`).

## Design System

Colors are defined as CSS variables in `app/globals.css` under `@theme` and referenced via Tailwind semantic class names. **No arbitrary hex values in components.**

```
Backgrounds:  bg-base #070d1a  bg-surface #0d1829  bg-input #0f1e33
              bg-register-form #000E23  bg-chip #32445E
Borders:      border-line #1b2f4e  border-line-light #243d60  border-line-focus #3b6ea0
Text:         text-ink #e8f0fe  text-ink-muted #7a9cc0  text-ink-dim #4a6a8a
              text-logo #ADC6FF  text-ink-title #D4E3FF
Accent:       text-accent / bg-accent #4a9eff  bg-accent-dark #2563eb
Status:       text-positive #34d399  text-warning #f59e0b
```

Custom utilities: `btn-gradient`, `bg-grid`, `checkbox-custom` (defined via `@layer components`).

Fonts: **Noto Serif** (`font-display`) for headings, **Inter** (`font-body`) for body text.
