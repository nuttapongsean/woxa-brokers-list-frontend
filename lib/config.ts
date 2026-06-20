export const publicPaths = new Set([
  '/login',
  '/register',
  '/brokers',
  '/markets',
  '/analysis',
  '/education',
  '/privacy',
  '/terms',
  '/risk-disclosure',
  '/contact',
  '/dev',
  '/about',
  '/careers',
  '/press',
  '/blog',
  '/help',
  '/docs',
  '/status',
  '/newsletter',
  '/forum',
]);

// Server-side uses API_URL (runtime env, Docker-aware); browser uses the baked NEXT_PUBLIC_API_URL
const serverApiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';
const clientApiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export const config = {
  apiUrl: typeof window === 'undefined' ? serverApiUrl : clientApiUrl,
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  defaultLocale: 'en',
  locales: ['en', 'th'] as const,
  api: {
    timeout: 10_000,
  },
  query: {
    brokerListStaleTime: 60_000,
    brokerDetailStaleTime: 300_000,
  },
  images: {
    loginBg: 'https://images.unsplash.com/photo-1435265603574-177a37a94c2f?q=80&w=764',
  },
} as const;
