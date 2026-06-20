'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CreateBrokerSchema, type CreateBrokerInput, type BrokerType } from '@/lib/schemas/broker';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { submitBroker } from '@/lib/api/brokers';
import { useState } from 'react';
import { ImageIcon, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmitBrokerFormProps {
  locale: string;
}

const BROKER_TYPES: { value: BrokerType; label: string }[] = [
  { value: 'cfd', label: 'CFD' },
  { value: 'bond', label: 'Bond' },
  { value: 'stock', label: 'Stock' },
  { value: 'crypto', label: 'Crypto' },
];

export function SubmitBrokerForm({ locale }: SubmitBrokerFormProps) {
  const t = useTranslations('submitBroker');
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateBrokerInput>({
    resolver: zodResolver(CreateBrokerSchema),
  });

  const selectedType = watch('brokerType');

  async function onSubmit(data: CreateBrokerInput) {
    setServerError('');
    try {
      await submitBroker(data);
      router.push(`/${locale}/brokers`);
    } catch {
      setServerError(t('error'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('fields.brokerName')}
          placeholder={t('fields.brokerNamePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={t('fields.slug')}
          placeholder={t('fields.slugPlaceholder')}
          error={errors.slug?.message}
          {...register('slug')}
        />
      </div>

      {/* Broker type toggle */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-logo">
          {t('fields.brokerType')}
        </label>
        <div className="flex gap-2">
          {BROKER_TYPES.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setValue('brokerType', value, { shouldValidate: true })}
              className={cn(
                'grow py-4',
                selectedType === value
                  ? 'bg-input-focus border-accent text-ink hover:border-accent hover:text-ink'
                  : 'bg-input border-line text-ink-muted'
              )}
            >
              {label}
            </Button>
          ))}
        </div>
        {errors.brokerType && (
          <p className="text-xs text-red-400">{errors.brokerType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('fields.logoUrl')}
          placeholder={t('fields.logoUrlPlaceholder')}
          error={errors.logoUrl?.message}
          iconLeft={<ImageIcon size={16} />}
          {...register('logoUrl')}
        />
        <Input
          label={t('fields.website')}
          placeholder={t('fields.websitePlaceholder')}
          error={errors.website?.message}
          iconLeft={<Globe size={16} />}
          {...register('website')}
        />
      </div>

      <Textarea
        label={t('fields.description')}
        placeholder={t('fields.descriptionPlaceholder')}
        rows={5}
        error={errors.description?.message}
        {...register('description')}
      />

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex items-center justify-end gap-10 py-8">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          {t('actions.discard')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
        >
          {t('actions.submit')}
        </Button>
      </div>
    </form>
  );
}
