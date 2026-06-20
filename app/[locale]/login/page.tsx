import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { config } from '@/lib/config';
import { LoginForm } from '@/components/forms/LoginForm';
import { Card } from '@/components/ui/Card';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.login' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false },
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'login' });

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 animate-fade-up">
      <Image
        src={config.images.loginBg}
        alt=""
        fill
        className="object-cover opacity-10"
        priority
        aria-hidden="true"
      />
      <div className="w-full max-w-[420px] relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-logo">{t('brandTitle')}</h1>
          <p className="uppercase tracking-[.15em] text-ink mt-1">
            {t('brandSubtitle')}
          </p>
        </div>

        {/* Card */}
        <Card className="p-8 shadow-lg [box-shadow:inset_0_3px_0_0_var(--color-logo),_0_10px_15px_-3px_rgb(0_0_0/0.1)]">
          <h2 className="text-xl font-display text-base text-ink mb-1">{t('sectionTitle')}</h2>
          <p className="text-ink-body mb-6">{t('sectionDesc')}</p>

          <LoginForm locale={locale} />
        </Card>
      </div>
    </div>
  );
}
