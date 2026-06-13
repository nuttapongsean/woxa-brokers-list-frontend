# Type Check

Run TypeScript type checking across the project and report errors.

## Usage
```
/type-check
```

## What This Does

Runs `npx tsc --noEmit` and interprets the output:

1. **Groups errors by file** for easier reading
2. **Flags `any` usage** — this project forbids `any` (use `unknown` + type narrowing, or Zod-inferred types)
3. **Checks Zod schema coverage** — any API response type that isn't derived from a Zod schema in `lib/schemas/` is flagged
4. **Suggests fixes** for common TypeScript errors in Next.js App Router:
   - `params` type on page components
   - `generateMetadata` return type
   - Server Component vs Client Component type mismatches
   - next-intl `useTranslations` vs `getTranslations` usage

## Common Errors and Fixes

### `params` type on pages
```tsx
// ❌ Wrong
export default function Page({ params }) { ... }

// ✅ Correct
interface PageProps {
  params: { locale: string; slug?: string };
}
export default function Page({ params }: PageProps) { ... }
```

### `useTranslations` in Server Component
```tsx
// ❌ Wrong — useTranslations is a hook, can't use in Server Component
import { useTranslations } from 'next-intl';
export default async function Page() {
  const t = useTranslations('brokers');
}

// ✅ Correct — use getTranslations in Server Components
import { getTranslations } from 'next-intl/server';
export default async function Page() {
  const t = await getTranslations('brokers');
}
```

### Zod-inferred types
```tsx
// ❌ Wrong — manually declared type that may drift from API
interface Broker {
  id: string;
  name: string;
}

// ✅ Correct — Zod schema is the single source of truth
import { z } from 'zod';
export const BrokerSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Broker = z.infer<typeof BrokerSchema>;
```

## Output Format

```
Type check: X errors found

📁 app/[locale]/brokers/page.tsx
  Line 12: Parameter 'params' implicitly has an 'any' type
  → Fix: Add PageProps interface

📁 lib/api/brokers.ts  
  Line 34: Type 'unknown' is not assignable to type 'Broker'
  → Fix: Parse response through BrokerSchema.parse()

✅ No errors in: components/, lib/schemas/, hooks/
```
