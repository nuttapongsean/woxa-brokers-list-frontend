import type { MetadataRoute } from 'next';
import { getBrokerSlugs } from '@/lib/api/brokers';
import { config } from '@/lib/config';

const BASE_URL = config.appUrl;
const LOCALES = config.locales;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = [];
  try {
    slugs = await getBrokerSlugs();
  } catch {
    slugs = [];
  }

  const staticRoutes = LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}/brokers`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/${locale}/brokers/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]);

  const brokerRoutes = slugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/brokers/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...brokerRoutes];
}
