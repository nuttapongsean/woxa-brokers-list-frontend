import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

if (process.env.NODE_ENV === 'development') {
  console.log('\n┌─ Woxa Config ─────────────────────────────');
  console.log('│  API URL  :', process.env.NEXT_PUBLIC_API_URL ?? '(not set)');
  console.log('│  App URL  :', process.env.NEXT_PUBLIC_APP_URL ?? '(not set)');
  console.log('│  Mock     :', process.env.NEXT_PUBLIC_USE_MOCK ?? 'false');
  console.log('│  Secret   :', process.env.SESSION_SECRET ? '✅ set' : '❌ NOT SET');
  console.log('│  Node env :', process.env.NODE_ENV);
  console.log('└───────────────────────────────────────────\n');
}

const nextConfig: NextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default withNextIntl(nextConfig);
