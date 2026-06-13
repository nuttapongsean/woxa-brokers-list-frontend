# Scaffold Component

Create a new reusable component for the Woxa brokers project.

## Usage
```
/scaffold-component <ComponentName> [category]
```

**Category options:** `ui` | `brokers` | `forms` | `layout` | `seo`

**Examples:**
- `/scaffold-component BrokerCard brokers`
- `/scaffold-component Button ui`
- `/scaffold-component SubmitBrokerForm forms`

## What This Does

Creates `components/<category>/<ComponentName>.tsx` with:
- Props interface named `<ComponentName>Props`
- Tailwind CSS classes only (no inline styles unless truly dynamic)
- ARIA attributes for accessibility
- `'use client'` directive only if the component needs hooks/events
- Export as named export (not default)

## Server vs Client Decision

Add `'use client'` only when the component uses:
- `useState`, `useEffect`, `useRef`, or any React hook
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- TanStack Query's `useQuery` / `useMutation` (client-side data fetching)

## Template (Server Component)

```tsx
// components/<category>/<ComponentName>.tsx

interface <ComponentName>Props {
  // props here
}

export function <ComponentName>({ ...props }: <ComponentName>Props) {
  return (
    <div>
      {/* content */}
    </div>
  );
}
```

## Template (Client Component)

```tsx
// components/<category>/<ComponentName>.tsx
'use client';

import { useState } from 'react';

interface <ComponentName>Props {
  // props here
}

export function <ComponentName>({ ...props }: <ComponentName>Props) {
  return (
    <div>
      {/* content */}
    </div>
  );
}
```

## Tailwind Design Tokens for This Project

Use these semantic class patterns — never raw hex colors:

```
bg-[var(--bg)]           → page background  #070d1a
bg-[var(--bg-card)]      → card background  #0d1829
bg-[var(--bg-input)]     → input background #0f1e33
border-[var(--border)]   → default border   #1b2f4e
text-[var(--text)]       → primary text     #e8f0fe
text-[var(--text-muted)] → secondary text   #7a9cc0
text-[var(--text-dim)]   → tertiary text    #4a6a8a
text-[var(--accent)]     → blue accent      #4a9eff
```

## Rules
- Props interface in the same file — never in a separate types file unless shared
- Zod-inferred types for any API data shapes (import from `lib/schemas/`)
- No `any` type — use `unknown` and narrow it
- Hover, focus-visible, and disabled states are mandatory for interactive elements
- Touch targets minimum 44px for mobile
