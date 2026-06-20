'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

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
    <Input
      type="search"
      value={value}
      onChange={handleChange}
      placeholder={t('placeholder')}
      aria-label={t('placeholder')}
      iconLeft={<Search size={16} aria-hidden="true" />}
      className="max-w-[520px]"
    />
  );
}
