export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
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
} as const;
