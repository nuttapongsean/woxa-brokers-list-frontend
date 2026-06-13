import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BrokerDetail } from '@/types';

interface BrokerHeroProps {
  broker: BrokerDetail;
}

export function BrokerHero({ broker }: BrokerHeroProps) {
  const t = useTranslations('brokerDetail');

  return (
    <div className="relative h-[340px] overflow-hidden">
      {broker.imageUrl ? (
        <Image
          src={broker.imageUrl}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1828] via-[#0e2240] to-[#061018]" />
      )}

      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-12 pb-10">
        {broker.grade && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-[5px] bg-accent-dark/25 border border-accent/40 rounded text-[10px] font-semibold uppercase tracking-widest text-accent">
              {broker.grade}
              {broker.rating && (
                <span className="text-yellow-400">{'★'.repeat(broker.rating)}</span>
              )}
            </span>
          </div>
        )}

        <h1 className="text-[52px] font-bold tracking-tight leading-[1.05] text-ink mb-3 max-w-[540px]">
          {broker.name}
        </h1>
        <p className="text-sm text-ink-muted max-w-[440px] leading-relaxed mb-6">
          {broker.description}
        </p>

        <div className="flex gap-3.5">
          {broker.website && (
            <a
              href={broker.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-sm btn-gradient text-white hover:opacity-90 transition-opacity"
            >
              {t('visitWebsite')}
            </a>
          )}
          {broker.prospectusUrl && (
            <a
              href={broker.prospectusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-sm bg-transparent border border-line-light text-ink hover:bg-surface-3 transition-colors"
            >
              {t('downloadProspectus')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
