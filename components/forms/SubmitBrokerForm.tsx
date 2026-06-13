'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CreateBrokerSchema, type CreateBrokerInput } from '@/lib/schemas/broker';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { submitBroker } from '@/lib/api/brokers';
import { useState } from 'react';

interface SubmitBrokerFormProps {
  locale: string;
}

const BROKER_TYPES = ['CFD', 'Bond', 'Stock', 'Crypto'] as const;

export function SubmitBrokerForm({ locale }: SubmitBrokerFormProps) {
  const t = useTranslations('submitBroker');
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBrokerInput>({
    resolver: zodResolver(CreateBrokerSchema),
  });

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

      {/* Type select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim">
          {t('fields.brokerType')}
        </label>
        <select
          {...register('type')}
          className="bg-input border border-line rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-line-focus"
        >
          {BROKER_TYPES.map((bt) => (
            <option key={bt} value={bt}>{bt}</option>
          ))}
        </select>
        {errors.type && (
          <p className="text-xs text-red-400">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('fields.logoUrl')}
          placeholder={t('fields.logoUrlPlaceholder')}
          error={errors.logoUrl?.message}
          {...register('logoUrl')}
        />
        <Input
          label={t('fields.website')}
          placeholder={t('fields.websitePlaceholder')}
          error={errors.website?.message}
          {...register('website')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim">
          {t('fields.description')}
        </label>
        <textarea
          {...register('description')}
          placeholder={t('fields.descriptionPlaceholder')}
          rows={5}
          className="bg-input border border-line rounded-lg px-4 py-3 text-sm text-ink resize-none focus:outline-none focus:border-line-focus placeholder:text-ink-dim"
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-400">{serverError}</p>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-ink-muted hover:text-ink transition-colors"
        >
          {t('actions.discard')}
        </button>
        <Button type="submit" variant="primary" size="md" loading={isSubmitting}>
          {t('actions.submit')}
        </Button>
      </div>
    </form>
  );
}
