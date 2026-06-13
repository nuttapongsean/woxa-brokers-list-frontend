'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { BrokerType } from '@/types';

type FilterValue = 'all' | BrokerType;

const TYPE_TKEY: Record<BrokerType, 'cfd' | 'bond' | 'stock' | 'crypto'> = {
  CFD: 'cfd',
  Bond: 'bond',
  Stock: 'stock',
  Crypto: 'crypto',
};

interface BrokerFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  types: BrokerType[];
}

export function BrokerFilters({ active, onChange, types }: BrokerFiltersProps) {
  const t = useTranslations('brokers.filters');

  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label={t('label')}>
      <span className="font-bold uppercase tracking-widest text-ink-dim mr-1">
        {t('label')}
      </span>
      <button
        onClick={() => onChange('all')}
        className={cn(
          'rounded-[12px] transition-all h-[36px] px-4 cursor-pointer',
          active === 'all'
            ? 'bg-logo text-base'
            : 'bg-filter-inactive text-ink-nav hover:text-base hover:bg-logo'
        )}
        aria-pressed={active === 'all'}
      >
        {t('all')}
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={cn(
            'rounded-[12px] transition-all h-[36px] px-4 cursor-pointer',
            active === type
              ? 'bg-logo text-base'
              : 'bg-filter-inactive text-ink-nav hover:text-base hover:bg-logo'
          )}
          aria-pressed={active === type}
        >
          {t(TYPE_TKEY[type])}
        </button>
      ))}
    </div>
  );
}
