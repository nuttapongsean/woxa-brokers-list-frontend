import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { RegisterForm } from '@/components/forms/RegisterForm';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.register' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false },
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'register' });

  return (
    <div className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left hero panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-grid border-r border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#061224]/80 via-transparent to-[#051020]/60" />

        <div className="relative z-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-8">
            {t('brandName')}
          </h2>
          <h1 className="text-[38px] font-bold text-ink leading-[1.15] max-w-[360px] mb-5">
            {t('heroTitle')}
          </h1>
          <p className="text-[13px] text-ink-muted leading-relaxed max-w-[320px]">
            {t('heroDesc')}
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-[28px] font-bold text-ink">$2.4T+</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-dim">
              {t('stats.managedCapital')}
            </p>
          </div>
          <div>
            <p className="text-[28px] font-bold text-ink">99.98%</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-dim">
              {t('stats.uptimeSla')}
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center px-8 lg:px-14 py-12">
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="text-xl font-bold text-ink mb-1">{t('formTitle')}</h2>
          <p className="text-[13px] text-ink-muted mb-7">{t('formDesc')}</p>

          <RegisterForm locale={locale} />

          {/* Compliance badges */}
          <div className="flex items-center gap-3 mt-6">
            {[t('badges.aes'), t('badges.gdpr'), t('badges.sec')].map((label) => (
              <span
                key={label}
                className="text-[9px] font-semibold uppercase tracking-widest text-ink-dim border border-line px-2 py-1 rounded"
              >
                {label}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-ink-dim mt-5">{t('copyright')}</p>
        </div>
      </div>
    </div>
  );
}
