import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SubmitBrokerForm } from '@/components/forms/SubmitBrokerForm';

interface SubmitBrokerPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SubmitBrokerPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.submitBroker' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false },
  };
}

export default async function SubmitBrokerPage({ params }: SubmitBrokerPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'submitBroker' });

  return (
    <div className="max-w-[780px] mx-auto px-8 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-ink mb-2">{t('title')}</h1>
        <p className="text-sm text-ink-muted leading-relaxed max-w-lg">{t('subtitle')}</p>
      </header>

      <div className="bg-surface border border-line rounded-xl p-8">
        <SubmitBrokerForm locale={locale} />
      </div>
    </div>
  );
}
