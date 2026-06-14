'use client';

import { useState, useDeferredValue, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useBrokers } from '@/hooks/useBrokers';
import { useBrokerTypes } from '@/hooks/useBrokerTypes';
import { BrokerCard } from '@/components/brokers/BrokerCard';
import { BrokerFilters } from '@/components/brokers/BrokerFilters';
import { BrokerSearchBar } from '@/components/brokers/BrokerSearchBar';
import { PartnerCTACard } from '@/components/brokers/PartnerCTACard';
import type { BrokerType } from '@/lib/schemas/broker';

type FilterValue = 'all' | BrokerType;

interface BrokersPageClientProps {
  locale: string;
}

export function BrokersPageClient({ locale }: BrokersPageClientProps) {
  const t = useTranslations('brokers');
  const tc = useTranslations('common');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const deferredSearch = useDeferredValue(search);

  const { data, isLoading, isError } = useBrokers({
    search: deferredSearch || undefined,
  });

  const { data: availableTypes = [] } = useBrokerTypes();

  const brokers = useMemo(() => {
    const all = data?.brokers ?? [];
    return filter === 'all' ? all : all.filter((b) => b.brokerType === filter);
  }, [data, filter]);

  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-ink-title font-display font-bold text-[32px] leading-[36px] sm:text-[48px] sm:leading-[52px] lg:text-[60px] lg:leading-[60px] flex items-center mb-3">
          {t('title')}
        </h1>
        <p className="text-ink-body text-sm max-w-xl leading-relaxed">{t('subtitle')}</p>
      </header>

      <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
        <BrokerSearchBar value={search} onChange={setSearch} />
        <BrokerFilters active={filter} onChange={setFilter} types={availableTypes} />
      </div>

      {isLoading && <BrokersGridSkeleton />}

      {isError && (
        <p className="text-center text-ink-muted py-20">{tc('error')}</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {brokers.map((broker, i) => (
            <BrokerCard key={broker.id} broker={broker} locale={locale} priority={i < 3} />
          ))}
          <PartnerCTACard />
        </div>
      )}
    </div>
  );
}

function BrokersGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface border border-line rounded-xl overflow-hidden animate-pulse"
        >
          <div className="h-[170px] bg-surface-2" />
          <div className="p-5 space-y-2">
            <div className="h-4 bg-surface-3 rounded w-3/4" />
            <div className="h-3 bg-surface-3 rounded w-full" />
            <div className="h-3 bg-surface-3 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
