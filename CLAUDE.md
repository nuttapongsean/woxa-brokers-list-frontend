# Woxa Brokers List — Frontend

## Project Overview

Full-stack developer assessment project. A Next.js frontend for **Woxa**, an institutional broker listing platform ("Sterling Midnight" terminal). The UI is dark-navy, financial/institutional in tone.

Reference mockups are in `./mockups/` — always consult them before implementing any page or component.

**Assessment criteria:** clean architecture, reusable components, API integration (low-latency, secure), i18n, SEO optimization.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Data fetching | TanStack Query v5 (React Query) |
| Forms | React Hook Form + Zod |
| i18n | next-intl |
| API client | Axios with interceptors (lib/api) |
| Schema validation | Zod |
| SEO | Next.js Metadata API + JSON-LD |
| Auth tokens | HTTP-only cookies (set by backend) |

---

## Design System

All colors, spacing, and typography come from the mockups. The palette is:

```
Background:    #070d1a (page), #0d1829 (card), #0f1e33 (input)
Border:        #1b2f4e (default), #243d60 (light/hover)
Text:          #e8f0fe (primary), #7a9cc0 (muted), #4a6a8a (dim)
Accent:        #4a9eff (blue), #2563eb (dark blue)
Positive:      #34d399 (green)
```

Define these as Tailwind CSS variables in `app/globals.css`. Never use arbitrary hex values in components — always use Tailwind semantic class names mapped to these variables.

Font: system-ui / `Inter` (next/font). Display headings use tight tracking (`tracking-tight`).

---

## Project Structure

```
woxa-brokers-list-frontend/
├── app/
│   └── [locale]/                    # next-intl locale wrapper
│       ├── layout.tsx               # Root layout (nav, footer, providers)
│       ├── page.tsx                 # Redirect → /[locale]/brokers
│       ├── brokers/
│       │   ├── page.tsx             # Brokers list  → mockups/brokers-list.html
│       │   ├── submit/
│       │   │   └── page.tsx         # Submit broker → mockups/submit-broker.html
│       │   └── [slug]/
│       │       └── page.tsx         # Broker detail → mockups/broker-detail.html
│       ├── login/
│       │   └── page.tsx             # Login         → mockups/login.html
│       └── register/
│           └── page.tsx             # Register      → mockups/register.html
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                          # Primitive reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── SecurityBadge.tsx
│   ├── brokers/
│   │   ├── BrokerCard.tsx           # Single card in the grid
│   │   ├── BrokerGrid.tsx           # Responsive grid wrapper
│   │   ├── BrokerFilters.tsx        # All Partners / CFD / Bond / Stock / Crypto pills
│   │   ├── BrokerSearchBar.tsx
│   │   ├── BrokerHero.tsx           # Detail page hero section
│   │   ├── PerformanceMetrics.tsx   # Right-side metrics card on detail page
│   │   ├── ContactCard.tsx
│   │   ├── MarketsGrid.tsx          # Available markets stat boxes
│   │   └── PartnerCTACard.tsx       # "Partner with Us" dashed card
│   ├── forms/
│   │   ├── SubmitBrokerForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── seo/
│       └── JsonLd.tsx               # Structured data injector
├── lib/
│   ├── api/
│   │   ├── client.ts                # Axios instance + interceptors
│   │   ├── brokers.ts               # Broker API functions
│   │   └── auth.ts                  # Auth API functions
│   ├── query/
│   │   ├── keys.ts                  # TanStack Query key factories
│   │   └── providers.tsx            # QueryClientProvider wrapper
│   └── schemas/
│       ├── broker.ts                # Zod schemas for broker API responses
│       └── auth.ts                  # Zod schemas for auth API responses
├── messages/
│   ├── en.json                      # English translations
│   └── th.json                      # Thai translations
├── types/
│   └── index.ts                     # Shared TypeScript types
├── hooks/
│   ├── useBrokers.ts                # useQuery wrapper for broker list
│   ├── useBroker.ts                 # useQuery wrapper for broker detail
│   └── useAuth.ts                   # Auth state hook
├── middleware.ts                    # next-intl locale routing
├── i18n.ts                          # next-intl config
├── next.config.ts
└── tailwind.config.ts
```

---

## Pages

### 1. Brokers List — `app/[locale]/brokers/page.tsx`
**Mockup:** `mockups/brokers-list.html`

- **Server Component** — fetches initial broker list via `fetch` for SSR (SEO critical)
- Renders `<BrokerGrid>` pre-populated from server; React Query hydrates for client-side filtering
- Filter pills (All / CFD / Bond / Stock / Crypto) are client-side — filter the already-fetched list, no refetch
- Search is debounced (300ms), client-side
- Metadata: title, description, OG tags

### 2. Broker Detail — `app/[locale]/brokers/[slug]/page.tsx`
**Mockup:** `mockups/broker-detail.html`

- **Server Component** — `generateMetadata` uses broker name/description for dynamic SEO
- `generateStaticParams` for popular brokers (ISR/SSG)
- Hero section with `next/image` optimized image
- Performance metrics, contact, markets sections
- Injects `BrokerJsonLd` (JSON-LD structured data)

### 3. Submit Broker — `app/[locale]/brokers/submit/page.tsx`
**Mockup:** `mockups/submit-broker.html`

- **Client Component** — React Hook Form + Zod validation
- Broker type toggle (CFD / Bond / Stock / Crypto) — single-select pill buttons
- Protected route — redirects to `/login` if unauthenticated

### 4. Login — `app/[locale]/login/page.tsx`
**Mockup:** `mockups/login.html`

- **Client Component** — React Hook Form
- On success: backend sets HTTP-only cookie; client redirects to `/brokers`
- Dark full-page background with grid lines (CSS pseudo-elements)

### 5. Register — `app/[locale]/register/page.tsx`
**Mockup:** `mockups/register.html`

- **Client Component** — React Hook Form + Zod (password confirmation validation)
- Split layout: decorative left panel + form right panel
- On success: redirect to `/login`

---

## API Integration

### Base client — `lib/api/client.ts`

```ts
// Axios instance configuration
baseURL: process.env.NEXT_PUBLIC_API_URL
timeout: 10000
withCredentials: true  // send HTTP-only cookies

// Request interceptor: attach X-Request-ID header
// Response interceptor: parse Zod schema, throw typed errors
// 401 interceptor: redirect to /login
```

### Environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api   # backend base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000        # for OG image generation
```

### Data fetching strategy

| Route | Strategy | Why |
|---|---|---|
| Brokers list | RSC `fetch` → React Query hydration | SEO + client filtering |
| Broker detail | RSC `fetch` + `generateStaticParams` | SEO + performance |
| Submit/Login/Register | Client-side React Query mutations | Interactive forms |

- **Caching:** React Query `staleTime: 60_000` for broker list, `staleTime: 300_000` for detail
- **Prefetching:** Hover over broker card prefetches `useBroker(slug)` via `queryClient.prefetchQuery`
- **Error handling:** Typed error boundaries per section; API errors map to user-visible toast messages

---

## i18n Setup

Using **next-intl** with locale prefix routing (`/en/...`, `/th/...`).

- Default locale: `en`
- Supported locales: `en`, `th`
- Translation files: `messages/en.json`, `messages/th.json`
- `middleware.ts` handles locale detection and redirect
- All user-facing strings go through `useTranslations()` — no hardcoded English strings in components
- `generateMetadata` uses `getTranslations()` for locale-aware titles and descriptions

Translation key structure:
```json
{
  "nav": { "brokers": "Brokers", "markets": "Markets", ... },
  "brokers": {
    "title": "Institutional Brokers",
    "subtitle": "Access global liquidity...",
    "search": { "placeholder": "Find brokers by name..." },
    "filters": { "all": "All Partners", "cfd": "CFD", ... },
    "card": { "viewDetails": "View Details" }
  },
  "brokerDetail": { ... },
  "submitBroker": { ... },
  "login": { ... },
  "register": { ... }
}
```

---

## SEO

### Per-page metadata

Every page exports `generateMetadata` (or a static `metadata` object):

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${broker.name} | Woxa Institutional Brokers`,
    description: broker.description.slice(0, 155),
    openGraph: {
      title: ...,
      description: ...,
      images: [{ url: broker.logoUrl, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', ... },
  };
}
```

### Structured data

`components/seo/JsonLd.tsx` renders `<script type="application/ld+json">` with:
- `Organization` schema on the brokers list page
- `FinancialService` schema on broker detail pages

### Sitemap + robots

- `app/sitemap.ts` — dynamically generates URLs for all broker detail pages
- `app/robots.ts` — disallows `/login`, `/register`, `/brokers/submit`

### Performance (Core Web Vitals)

- `next/image` with `priority` on above-fold images
- Route-level code splitting (automatic with App Router)
- `loading="lazy"` on below-fold broker card images
- No layout shift: skeleton placeholders match final card dimensions

---

## Security

- Auth tokens stored in **HTTP-only cookies** (set by backend) — never `localStorage`
- All API requests use `withCredentials: true`
- Form inputs sanitized via Zod before sending to API
- `next.config.ts` sets strict security headers:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- Protected routes checked in `middleware.ts` — no client-side-only guards

---

## Component Conventions

- **Server Components by default.** Add `'use client'` only when the component needs hooks, event handlers, or browser APIs.
- Props interfaces named `<ComponentName>Props`, defined in the same file.
- No `any` — use Zod-inferred types from `lib/schemas/`.
- Tailwind classes only — no inline `style` except for truly dynamic values (e.g., calculated widths). When a string of classes is reused 3+ times, extract it to a `const` or `cva` variant.
- Icon system: inline SVGs only (no icon library dependency). Keep SVGs in `components/ui/icons/`.
- All interactive states: hover, focus-visible, disabled — must be implemented.

---

## Development Commands

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## Implementation Order

1. Initialize Next.js 15 project with TypeScript + Tailwind CSS v4
2. Configure next-intl (middleware, i18n.ts, message files)
3. Set up Tailwind design tokens (CSS variables from mockup palette)
4. Build shared layout: `Navbar`, `Footer`
5. Build primitive UI components: `Button`, `Input`, `Badge`, `Card`
6. Set up API client (`lib/api/client.ts`) and React Query provider
7. Define Zod schemas and TypeScript types
8. Implement pages in order: Brokers List → Broker Detail → Submit Broker → Login → Register
9. Add `generateMetadata`, JSON-LD, sitemap, robots
10. Add i18n strings (en + th) — replace all hardcoded strings last
