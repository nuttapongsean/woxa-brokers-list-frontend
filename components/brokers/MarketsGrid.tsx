import { useTranslations } from 'next-intl';
import type { MarketStats } from '@/types';

type MarketKey = 'forexPairs' | 'indices' | 'commodities' | 'equities' | 'sovereignBonds' | 'cryptoEtps';

interface MarketsGridProps {
  markets: MarketStats;
}

export function MarketsGrid({ markets }: MarketsGridProps) {
  const t = useTranslations('brokerDetail');
  const mt = useTranslations('brokerDetail.markets');

  const allItems: { key: MarketKey; value: number | undefined }[] = [
    { key: 'forexPairs', value: markets.forexPairs },
    { key: 'indices', value: markets.indices },
    { key: 'commodities', value: markets.commodities },
    { key: 'equities', value: markets.equities },
    { key: 'sovereignBonds', value: markets.sovereignBonds },
    { key: 'cryptoEtps', value: markets.cryptoEtps },
  ];
  const items = allItems.filter((item) => item.value !== undefined);

  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink mb-5">{t('availableMarkets')}</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {items.map(({ key, value }) => (
          <div
            key={key}
            className="bg-surface rounded-lg px-3 py-4 text-center"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-ink-dim mb-1.5">
              {mt(key)}
            </span>
            <span className="text-[22px] font-bold text-ink">
              {value?.toLocaleString()}
              {(key === 'equities' || key === 'forexPairs') && value && value > 100 ? '+' : ''}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
