# Init Project

Initialize the Next.js 15 project from scratch following the CLAUDE.md specification.

## Usage
```
/init-project
```

## What This Does

Runs the full project initialization sequence as specified in `CLAUDE.md`. Only run this **once** on a blank directory.

## Step 1 — Create Next.js App

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-turbopack
```

## Step 2 — Install Dependencies

```bash
npm install \
  next-intl \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  axios \
  zod \
  react-hook-form \
  @hookform/resolvers
```

## Step 3 — Create Directory Structure

Create all directories listed in `CLAUDE.md`:
- `app/[locale]/brokers/`, `app/[locale]/brokers/[slug]/`, `app/[locale]/brokers/submit/`
- `app/[locale]/login/`, `app/[locale]/register/`
- `components/layout/`, `components/ui/`, `components/brokers/`, `components/forms/`, `components/seo/`
- `lib/api/`, `lib/query/`, `lib/schemas/`
- `messages/` (with `en.json` and `th.json`)
- `types/`, `hooks/`

## Step 4 — Configure next-intl

Create:
- `middleware.ts` — locale routing with `createMiddleware`
- `i18n.ts` — `getRequestConfig` export
- `messages/en.json` — full English translation structure (see `/add-translation`)
- `messages/th.json` — full Thai translation structure

## Step 5 — Configure Tailwind Design Tokens

Add CSS variables to `app/globals.css`:

```css
:root {
  --bg: #070d1a;
  --bg-card: #0d1829;
  --bg-card-2: #0f1e33;
  --bg-input: #0f1e33;
  --bg-input-focus: #122240;
  --border: #1b2f4e;
  --border-light: #243d60;
  --border-focus: #3b6ea0;
  --text: #e8f0fe;
  --text-muted: #7a9cc0;
  --text-dim: #4a6a8a;
  --accent: #4a9eff;
  --accent-dark: #2563eb;
  --positive: #34d399;
}
```

## Step 6 — Configure Security Headers

Add to `next.config.ts`:

```ts
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

## Step 7 — Set Up API Client

Create `lib/api/client.ts` with Axios instance:
- `baseURL: process.env.NEXT_PUBLIC_API_URL`
- `timeout: 10000`
- `withCredentials: true`
- Request interceptor: attach `X-Request-ID` header
- Response interceptor: parse Zod schema, throw typed errors
- 401 interceptor: redirect to `/login`

## Step 8 — Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Verification

After init, run:
```bash
npm run build
npm run type-check
```

Both should pass with zero errors before implementing any pages.
