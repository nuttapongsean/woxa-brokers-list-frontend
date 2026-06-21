import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { BrokerDetail } from '@/lib/schemas/broker';

interface BrokerHeroProps {
  broker: BrokerDetail;
}

export async function BrokerHero({ broker }: BrokerHeroProps) {
  const t = await getTranslations('brokerDetail');

  return (
    <div className="relative h-[600px] overflow-hidden">
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

      <div className="absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-10">
        {broker.grade && (
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-2 bg-[#001B43] rounded text-[11px] font-semibold uppercase tracking-widest text-accent">
              {broker.grade}
            </span>
            <span>
              {broker.rating && (
                <span className="text-logo">{'★'.repeat(broker.rating)}</span>
              )}
            </span>
          </div>
        )}

        <h1 className="font-display text-[52px] font-bold tracking-tight leading-[1.05] text-ink mb-3 max-w-[540px]">
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
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-sm text-white btn-gradient hover:brightness-110 active:scale-95 transition-all"
            >
              {t('visitWebsite')}
            </a>
          )}
          {broker.prospectusUrl && (
            <a
              href={broker.prospectusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-sm bg-transparent border border-line-light text-ink-muted hover:border-accent hover:text-accent active:scale-95 transition-all"
            >
              {t('downloadProspectus')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
