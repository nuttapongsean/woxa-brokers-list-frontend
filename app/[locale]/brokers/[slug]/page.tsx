import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBroker, getBrokerSlugs } from '@/lib/api/brokers';
import { BrokerHero } from '@/components/brokers/BrokerHero';
import { PerformanceMetrics } from '@/components/brokers/PerformanceMetrics';
import { ContactCard } from '@/components/brokers/ContactCard';
import { MarketsGrid } from '@/components/brokers/MarketsGrid';
import { JsonLd } from '@/components/seo/JsonLd';

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
    const broker = await getBroker(slug);
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
    broker = await getBroker(slug);
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

  const hasContact = broker.contactAddress || broker.contactEmail;

  return (
    <>
      <JsonLd data={jsonLd} />

      <BrokerHero broker={broker} />

      <div className="mx-auto p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            {broker.longDescription && (
              <section className="mb-10">
                <h2 className="font-display text-xl font-semibold text-logo mb-4">
                  {broker.name}
                </h2>
                <p className="text-ink-body text-sm leading-relaxed whitespace-pre-line">
                  {broker.longDescription}
                </p>
              </section>
            )}

            {broker.features && broker.features.length > 0 && (
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {broker.features.map((feature, i) => (
                    <div key={i} className="bg-surface rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-ink mb-1">{feature.title}</h3>
                      <p className="text-[13px] text-ink-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="flex flex-col gap-6">
            {broker.metrics && <PerformanceMetrics metrics={broker.metrics} />}
            {hasContact && (
              <ContactCard
                address={broker.contactAddress}
                email={broker.contactEmail}
                website={broker.website}
              />
            )}
          </aside>
        </div>

        {broker.markets && (
          <div className="mt-5">
            <MarketsGrid markets={broker.markets} />
          </div>
        )}
      </div>
    </>
  );
}
