import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BrokersPageClient } from './BrokersPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

interface BrokersPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BrokersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.brokers' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/brokers`,
      languages: { en: '/en/brokers', th: '/th/brokers' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function BrokersPage({ params }: BrokersPageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Institutional Brokers | Woxa',
    description: 'Access global liquidity through our curated network of elite financial institutions and market makers.',
    url: `https://woxa.com/${locale}/brokers`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BrokersPageClient locale={locale} />
    </>
  );
}
