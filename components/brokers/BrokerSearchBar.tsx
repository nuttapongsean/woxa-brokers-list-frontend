'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { Search } from 'lucide-react';

interface BrokerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function BrokerSearchBar({ value, onChange }: BrokerSearchBarProps) {
  const t = useTranslations('brokers.search');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="flex items-center gap-3 bg-input rounded-md px-3 py-3 max-w-[520px] h-[56px]">
      <Search size={20} strokeWidth={2} className="text-logo shrink-0" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={t('placeholder')}
        className="bg-transparent border-none outline-none focus-visible:outline-none text-ink-muted text-sm flex-1 placeholder:text-ink-dim"
        aria-label={t('placeholder')}
      />
    </div>
  );
}