import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Lock, ShieldCheck } from 'lucide-react';
import { LoginForm } from '@/components/forms/LoginForm';

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
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 bg-grid">
      <div className="w-full max-w-[420px]">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-dark/20 border border-accent/30 mb-4">
            <Lock size={20} className="text-accent" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-ink">{t('brandTitle')}</h1>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim mt-1">
            {t('brandSubtitle')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-line rounded-2xl p-8 shadow-lg">
          <h2 className="text-base font-semibold text-ink mb-1">{t('sectionTitle')}</h2>
          <p className="text-[13px] text-ink-muted mb-6">{t('sectionDesc')}</p>

          <LoginForm locale={locale} />
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <SecurityBadge label={t('badges.tls')} />
          <SecurityBadge label={t('badges.biometric')} />
        </div>
      </div>
    </div>
  );
}

function SecurityBadge({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-dim">
      <ShieldCheck size={10} aria-hidden="true" />
      {label}
    </span>
  );
}
