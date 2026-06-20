'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { BrokerType } from '@/lib/schemas/broker';

type FilterValue = 'all' | BrokerType;

interface BrokerFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  types: string[];
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
          'rounded-full transition-all h-[36px] px-4 cursor-pointer',
          active === 'all'
            ? 'bg-logo text-base'
            : 'bg-filter-inactive text-ink-muted hover:text-base hover:bg-logo',
        )}
        aria-pressed={active === 'all'}
      >
        {t('all')}
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type as BrokerType)}
          className={cn(
            'rounded-full transition-all h-[36px] px-4 cursor-pointer',
            active === type
              ? 'bg-logo text-base'
              : 'bg-filter-inactive text-ink-muted hover:text-base hover:bg-logo',
          )}
          aria-pressed={active === type}
        >
          {t(type as BrokerType)}
        </button>
      ))}
    </div>
  );
}
