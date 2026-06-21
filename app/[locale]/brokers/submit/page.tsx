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
    <div className="max-w-[780px] mx-auto p-6 animate-fade-up">
      <header>
        <h1 className="font-display text-[32px] leading-[36px] sm:text-[48px] sm:leading-[52px] lg:text-[60px] lg:leading-[60px] font-bold text-ink mb-3">{t('title')}</h1>
        <p className="text-sm leading-relaxed max-w-lg">{t('subtitle')}</p>
      </header>

      <div className="bg-surface rounded-xl p-8 my-10">
        <SubmitBrokerForm locale={locale} />
      </div>
    </div>
  );
}
