import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBroker, getBrokerSlugs } from '@/lib/api/brokers';
import { BrokerHero } from '@/components/brokers/BrokerHero';
import { PerformanceMetrics } from '@/components/brokers/PerformanceMetrics';
import { ContactCard } from '@/components/brokers/ContactCard';
import { MarketsGrid } from '@/components/brokers/MarketsGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';

interface BrokerDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getBrokerSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BrokerDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const { broker } = await getBroker(slug);
    return {
      title: `${broker.name} | Woxa`,
      description: broker.description,
      alternates: {
        canonical: `/${locale}/brokers/${slug}`,
        languages: { en: `/en/brokers/${slug}`, th: `/th/brokers/${slug}` },
      },
      openGraph: {
        title: `${broker.name} | Woxa`,
        description: broker.description,
        images: broker.imageUrl ? [{ url: broker.imageUrl }] : [],
        type: 'website',
      },
    };
  } catch {
    return { title: 'Broker | Woxa' };
  }
}

export default async function BrokerDetailPage({ params }: BrokerDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  let broker;
  try {
    const res = await getBroker(slug);
    broker = res.broker;
  } catch {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: broker.name,
    description: broker.description,
    url: broker.website,
    logo: broker.logoUrl,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <BrokerHero broker={broker} />

      <div className="max-w-[1280px] mx-auto px-8 py-10">
        <Link
          href={`/${locale}/brokers`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors mb-8"
        >
          ← {t('backToBrokers')}
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {broker.longDescription && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold text-ink mb-4">
                  {broker.name}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                  {broker.longDescription}
                </p>
              </section>
            )}

            {broker.features && broker.features.length > 0 && (
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {broker.features.map((feature, i) => (
                    <div key={i} className="bg-surface border border-line rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-ink mb-1">{feature.title}</h3>
                      <p className="text-[13px] text-ink-muted leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {broker.markets && <MarketsGrid markets={broker.markets} />}
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] flex-shrink-0">
            {broker.metrics && <PerformanceMetrics metrics={broker.metrics} />}
            {broker.contact && <ContactCard contact={broker.contact} />}
          </aside>
        </div>
      </div>
    </>
  );
}
