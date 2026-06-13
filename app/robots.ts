import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

const BASE_URL = config.appUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/en/', '/th/'],
        disallow: ['/en/login', '/th/login', '/en/register', '/th/register', '/en/brokers/submit', '/th/brokers/submit'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
