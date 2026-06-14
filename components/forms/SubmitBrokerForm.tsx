'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CreateBrokerSchema, type CreateBrokerInput, type BrokerType } from '@/lib/schemas/broker';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { submitBroker } from '@/lib/api/brokers';
import { useState } from 'react';
import { ImageIcon, Globe } from 'lucide-react';

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
          className="bg-submit-broker-form focus:bg-submit-broker-form rounded"
          label={t('fields.brokerName')}
          placeholder={t('fields.brokerNamePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          className="bg-submit-broker-form focus:bg-submit-broker-form rounded"
          label={t('fields.slug')}
          placeholder={t('fields.slugPlaceholder')}
          error={errors.slug?.message}
          {...register('slug')}
        />
      </div>

      {/* Broker type toggle */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-logo">
          {t('fields.brokerType')}
        </label>
        <div className="flex gap-2">
          {BROKER_TYPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('brokerType', value, { shouldValidate: true })}
              className={[
                'grow px-5 py-4 rounded text-sm border transition-colors',
                selectedType === value
                  ? 'bg-submit-broker-form border-accent text-ink'
                  : 'bg-submit-broker-type border-line hover:border-accent hover:bg-submit-broker-form',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.brokerType && (
          <p className="text-xs text-red-400">{errors.brokerType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          className="bg-submit-broker-form focus:bg-submit-broker-form rounded"
          label={t('fields.logoUrl')}
          placeholder={t('fields.logoUrlPlaceholder')}
          error={errors.logoUrl?.message}
          iconLeft={<ImageIcon size={16} />}
          {...register('logoUrl')}
        />
        <Input
          className="bg-submit-broker-form focus:bg-submit-broker-form rounded"
          label={t('fields.website')}
          placeholder={t('fields.websitePlaceholder')}
          error={errors.website?.message}
          iconLeft={<Globe size={16} />}
          {...register('website')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-logo">
          {t('fields.description')}
        </label>
        <textarea
          {...register('description')}
          placeholder={t('fields.descriptionPlaceholder')}
          rows={5}
          className={`rounded bg-submit-broker-form border px-4 py-3 text-sm text-ink resize-none focus:outline-none placeholder:text-ink-dim ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-line-focus'}`}
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        )}
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex items-center justify-end gap-10 py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-ink-body hover:brightness-80 transition-colors"
        >
          {t('actions.discard')}
        </button>
        <Button
          className="rounded shadow-lg text-black hover:brightness-80"
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
