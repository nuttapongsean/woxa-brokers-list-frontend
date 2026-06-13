'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Handshake } from 'lucide-react';

export function PartnerCTACard() {
  const t = useTranslations('brokers.partner');
  const locale = useLocale();

  return (
    <div className="text-logoborder border-dashed border-accent/30 h-full rounded-xl flex flex-col items-center justify-center p-10 text-center gap-3 bg-surface">
      <Handshake size={48} strokeWidth={1.5} className="text-logo" aria-hidden="true" />
      <h1 className="font-display text-[17px] font-semibold text-ink">{t('title')}</h1>
      <p className="text-[13px] text-ink-muted leading-[1.55] max-w-[200px]">{t('description')}</p>
      <Link
        href={`/${locale}/brokers/submit`}
        className="inline-flex items-center justify-center mt-1 h-9 px-6 bg-logo hover:bg-logo/50 text-base font-semibold rounded-[4px] transition-colors"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
