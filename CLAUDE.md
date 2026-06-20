# Woxa Brokers List — Frontend

## Documentation Maintenance

Always update `CLAUDE.md` whenever any of the following changes. Do not wait to be asked.

| Change type | What to update |
|---|---|
| Add / remove a page or component | Project structure tree |
| Add / remove a dependency (`package.json`) | Tech Stack table |
| Add a new color / CSS variable | Design System color palette |
| Add / remove a custom utility class | Custom Utilities table |
| Change `lib/config.ts` or env variables | API Integration → config section + env block |
| Change a Zod schema or TypeScript type | Relevant schema / type description |
| Add / remove i18n namespaces or keys | i18n Setup → key namespaces list |
| Add a new shared pattern or convention | Component Conventions section |
| Add / remove icon usage patterns | Design System → Icons section |

---

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
| Icons | lucide-react |

---

## Design System

All colors come from CSS variables defined in `app/globals.css` under `@theme`. **Never use arbitrary hex values in components** — always use Tailwind semantic class names mapped to these variables.

### Color Palette

```
Backgrounds:
  bg-base          #070d1a   page background
  bg-surface       #0d1829   card / panel
  bg-surface-2     #0f1e33
  bg-surface-3     #101f34
  bg-input         #0f1e33   default input (used across all forms)
  bg-input-focus   #122240   focused input / active toggle
  bg-chip          #32445E   chips / small buttons
  bg-filter-inactive #1A2B41 inactive filter pills

Borders:
  border-line         #1b2f4e  default
  border-line-light   #243d60  hover
  border-line-focus   #3b6ea0  focused

Text:
  text-ink-title  #D4E3FF   headings
  text-ink        #e8f0fe   primary
  text-ink-body   rgba(212,227,255,0.6)  body
  text-ink-muted  #7a9cc0   secondary
  text-ink-dim    #4a6a8a   labels / captions
  text-logo       #ADC6FF   logo blue / link accent

Accent:
  text-accent / bg-accent  #4a9eff  interactive blue
  bg-accent-dark           #2563eb
  text-positive            #34d399  green / success
  text-warning             #f59e0b  amber / maintenance
```

### Typography

- **Display / headings:** `font-display` → Noto Serif (`--font-noto-serif`)
- **Body:** `font-body` → Inter (`--font-inter`)
- Display headings use `tracking-tight` or tight custom tracking

### Custom Utilities (`app/globals.css`)

| Class | Purpose |
|---|---|
| `btn-gradient` | Primary button gradient (#ADC6FF → #3A81F5) |
| `bg-grid` | Grid-line background for auth pages |
| `checkbox-custom` | Styled checkbox with `appearance-none`, bg-chip base, accent on checked |

### Icons

Use **lucide-react** exclusively. No inline SVGs unless there is no equivalent Lucide icon. Common icons in use: `Landmark`, `ShieldCheck`, `TrendingUp`, `MapPin`, `Mail`, `Globe`, `Bell`, `CircleUserRound`, `Menu`, `X`, `Eye`, `EyeOff`, `Construction`, `BarChart2`, `GraduationCap`.

---

## Project Structure

```
woxa-brokers-list-frontend/
├── app/
│   ├── layout.tsx               # Global layout
│   ├── page.tsx                 # Root redirect → /[locale]/brokers
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── globals.css              # @theme tokens + custom utilities
│   └── [locale]/
│       ├── layout.tsx           # Locale layout (Navbar, Footer, providers)
│       ├── brokers/
│       │   ├── page.tsx             # Brokers list (SSR)
│       │   ├── BrokersPageClient.tsx # Client filtering/search logic
│       │   ├── submit/
│       │   │   └── page.tsx         # Submit broker form
│       │   └── [slug]/
│       │       └── page.tsx         # Broker detail (SSR + ISR)
│       ├── login/
│       │   └── page.tsx
│       ├── register/
│       │   └── page.tsx             # Split layout: left image panel + right form
│       ├── markets/
│       │   └── page.tsx             # Under maintenance
│       ├── analysis/
│       │   └── page.tsx             # Under maintenance
│       ├── education/
│       │   └── page.tsx             # Under maintenance
│       ├── privacy/page.tsx
│       ├── terms/page.tsx
│       ├── risk-disclosure/page.tsx
│       ├── contact/page.tsx
│       └── dev/
│           └── page.tsx             # Component gallery (dev only, public path)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Nav links, mobile drawer, Bell + account icons
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx           # variants: primary, ghost, outline; sizes: sm, md, lg
│   │   ├── Input.tsx            # label, iconLeft, iconRight, rightAction, error; rounded-lg
│   │   ├── Textarea.tsx         # label, error; same styling tokens as Input
│   │   ├── Checkbox.tsx         # label, labelContent (ReactNode), description, error; uses checkbox-custom
│   │   ├── Autocomplete.tsx     # combobox; type-to-filter, keyboard nav (↑↓ Enter Esc), clear button
│   │   ├── Select.tsx           # native select + ChevronDown overlay; label, placeholder, error
│   │   ├── RadioGroup.tsx       # controlled radio list; vertical/horizontal; label+description per option
│   │   ├── MultiSelect.tsx      # dropdown multiselect with chip display; controlled value[]
│   │   ├── FileUpload.tsx       # drag-and-drop zone; multiple, accept, maxSizeMb; file list
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── UnderMaintenance.tsx # Shared placeholder for unbuilt pages
│   ├── brokers/
│   │   ├── BrokerCard.tsx
│   │   ├── BrokerFilters.tsx    # All / CFD / Bond / Stock / Crypto pills
│   │   ├── BrokerSearchBar.tsx
│   │   ├── BrokerHero.tsx       # Detail page hero
│   │   ├── PerformanceMetrics.tsx
│   │   ├── ContactCard.tsx      # MapPin / Mail / Globe icons
│   │   ├── MarketsGrid.tsx
│   │   └── PartnerCTACard.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx     # Includes agreeToTerms checkbox (checkbox-custom)
│   │   └── SubmitBrokerForm.tsx
│   └── seo/
│       └── JsonLd.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts            # Axios instance (baseURL, withCredentials, interceptors)
│   │   ├── brokers.ts
│   │   └── auth.ts
│   ├── query/
│   │   ├── keys.ts
│   │   └── providers.tsx
│   ├── schemas/
│   │   ├── broker.ts
│   │   └── auth.ts              # LoginSchema, RegisterSchema (incl. agreeToTerms)
│   ├── mock/
│   │   └── data.ts              # Mock broker data (used when NEXT_PUBLIC_USE_MOCK=true)
│   ├── config.ts                # App config + images.loginBg URL
│   └── utils.ts                 # cn() helper
├── messages/
│   ├── en.json
│   └── th.json
├── types/
│   └── index.ts                 # RegisterInput includes agreeToTerms: boolean
├── hooks/
│   ├── useBrokers.ts
│   ├── useBroker.ts
│   └── useAuth.ts
├── proxy.ts             # Next.js 16 middleware (auth guard + guest-only redirect + next-intl)
├── i18n.ts
└── next.config.ts
```

---

## Pages

### 1. Brokers List — `app/[locale]/brokers/page.tsx`
- **Server Component** — fetches initial broker list via `fetch` for SSR (SEO critical)
- Client filtering/search handled in `BrokersPageClient.tsx`
- Filter pills (All / CFD / Bond / Stock / Crypto) — client-side, no refetch
- Search debounced 300ms

### 2. Broker Detail — `app/[locale]/brokers/[slug]/page.tsx`
- **Server Component** — `generateMetadata` for dynamic SEO, `generateStaticParams` for ISR
- Sections: `BrokerHero`, `PerformanceMetrics`, `ContactCard`, `MarketsGrid`, `PartnerCTACard`
- Injects `BrokerJsonLd` (JSON-LD `FinancialService` schema)

### 3. Submit Broker — `app/[locale]/brokers/submit/page.tsx`
- **Client Component** — React Hook Form + Zod
- Broker type toggle: CFD / Bond / Stock / Crypto (single-select pills)
- Protected route — redirects to `/login` if unauthenticated

### 4. Login — `app/[locale]/login/page.tsx`
- **Client Component** — React Hook Form
- Background: `bg-grid` utility + gradient overlay

### 5. Register — `app/[locale]/register/page.tsx`
- **Client Component** — React Hook Form + Zod (`RegisterSchema` with `agreeToTerms`)
- Left panel: `config.images.loginBg` background image + gradient overlay (`justify-end` — text at bottom)
- Left panel content (bottom): Landmark icon + brand name, hero title/desc, stats row
- Right panel: form inputs using `bg-register-form` + `checkbox-custom` for terms agreement

### 6. Under Maintenance — markets / analysis / education
- Uses shared `<UnderMaintenance>` component
- Shows `Construction` icon badge in `text-warning`, page-specific icon, title, description

---

## Register Page — Left Panel Details

```
Background image: config.images.loginBg (Unsplash, cover + center)
Gradient overlay: linear-gradient(0deg, #070d1a 0%, rgba(7,13,26,0.4) 50%, rgba(7,13,26,0) 100%)
Layout: flex-col justify-end (all content pinned to bottom)
Content order (bottom):
  1. <Landmark size={14} /> + brandName  (text-logo, uppercase, tracking-widest)
  2. heroTitle  (font-display, text-[60px])
  3. heroDesc   (text-[14px], text-ink-muted)
  4. Stats row: $2.4T+ | 99.98%  (font-display, text-[28px], text-logo)
```

---

## API Integration

### `lib/config.ts`

```ts
config.apiUrl       // NEXT_PUBLIC_API_URL (default: http://localhost:4000/api)
config.appUrl       // NEXT_PUBLIC_APP_URL (default: http://localhost:3000)
config.useMock      // NEXT_PUBLIC_USE_MOCK === 'true' → use mock data
config.images.loginBg  // Unsplash URL used as bg for register/login left panels
config.query.brokerListStaleTime   // 60_000 ms
config.query.brokerDetailStaleTime // 300_000 ms
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=true   # set to true to use mock data without a backend
```

---

## i18n Setup

- Default locale: `en` | Supported: `en`, `th`
- Routing: `/en/...`, `/th/...` via `proxy.ts` (Next.js 16 supports `proxy.ts` as the middleware entry point directly)
- Auth guard in `proxy.ts`: unauthenticated users on protected paths → redirect to `/[locale]/login`; logged-in users on `/login` or `/register` → redirect to `/[locale]/brokers`
- Public paths defined in `lib/config.ts` → `publicPaths` Set
- All user-facing strings → `useTranslations()` / `getTranslations()`
- Key namespaces: `nav`, `brokers`, `brokerDetail`, `submitBroker`, `login`, `register`, `common`, `footer`, `meta`

---

## Component Conventions

- **Server Components by default.** Add `'use client'` only when the component needs hooks, events, or browser APIs.
- Props interfaces named `<ComponentName>Props`, defined in the same file.
- No `any` — use Zod-inferred types from `lib/schemas/` or interfaces from `types/index.ts`.
- **No arbitrary hex values** in JSX — always use named Tailwind classes from `@theme`.
- Use `cn()` for conditional class composition.
- Icons: **lucide-react** only. Pass `size` and `aria-hidden="true"` on decorative icons.
- All interactive states: hover, focus-visible, disabled — must be implemented.
- `@layer components` for multi-state custom CSS (e.g. `.checkbox-custom`) — `@utility` does not support nested pseudo-selectors in Tailwind v4.

### Shared Components First

**Always check `components/ui/` before writing any UI element.** The canonical shared components are:
`Button`, `Input`, `Textarea`, `Checkbox`, `Autocomplete`, `Select`, `RadioGroup`, `MultiSelect`, `FileUpload`, `Badge`, `Card`.

- If a shared component covers the use case → use it as-is, no inline recreation.
- If a shared component is close but not quite right → extend via props or `className`, do not duplicate.
- If no shared component fits → **ask the user** whether to create a new shared component or use a one-off local element before writing any code.

### Responsive Design

This app runs on **iOS, Android, and web** — every component and page must work across all screen sizes.

- Mobile-first: base styles target small screens, use `sm:`, `md:`, `lg:` breakpoints to scale up.
- Minimum tap target: `44×44px` for all interactive elements on touch screens.
- No fixed pixel widths on containers — use `max-w-*` with `w-full` or `flex`/`grid` fluid layouts.
- Test layout at 375px (iPhone SE), 768px (tablet), and 1280px (desktop) breakpoints.
- Avoid `hover:`-only interactions — pair with `focus-visible:` or `active:` so touch users get feedback.

---

## Development Commands

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```
