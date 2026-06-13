# Scaffold Page

Create a new Next.js App Router page for the Woxa brokers project.

## Usage
```
/scaffold-page <route>
```

**Examples:**
- `/scaffold-page brokers/[slug]/reviews`
- `/scaffold-page markets`

## What This Does

Creates the following files for the given route under `app/[locale]/<route>/`:

1. **`page.tsx`** — Server Component with:
   - `generateMetadata` export using `getTranslations` from next-intl
   - Proper TypeScript `PageProps` interface (`params: { locale: string }`)
   - `unstable_setRequestLocale(locale)` call for static rendering
   - Suspense boundary wrapping the main content
   - JSON-LD structured data via `<JsonLd>` if it's a public-facing page

2. **`loading.tsx`** — Skeleton loader matching the page layout (dark-navy cards/lines matching the Woxa design system)

3. **`error.tsx`** — `'use client'` error boundary with a retry button

## Template

```tsx
// app/[locale]/<route>/page.tsx
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '<namespace>' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function <PageName>Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('<namespace>');

  return (
    <main>
      {/* Page content */}
    </main>
  );
}
```

## Rules
- All pages live under `app/[locale]/` — never create pages outside this wrapper
- Use `getTranslations` (server) not `useTranslations` (client) in Server Components
- Always add the new translation namespace key to both `messages/en.json` and `messages/th.json`
- Consult `./mockups/` for the correct layout before implementing
