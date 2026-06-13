'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/lib/schemas/auth';
import type { LoginInput } from '@/types';
import { useLogin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

interface LoginFormProps {
  locale: string;
}

export function LoginForm({ locale }: LoginFormProps) {
  const t = useTranslations('login');
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setServerError('');
    loginMutation.mutate(data, {
      onSuccess: () => router.push(`/${locale}/brokers`),
      onError: () => setServerError(t('error')),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label={t('email')}
        type="email"
        placeholder={t('emailPlaceholder')}
        error={errors.email?.message}
        autoComplete="email"
        {...register('email')}
      />

      <Input
        label={t('password')}
        type="password"
        placeholder={t('passwordPlaceholder')}
        error={errors.password?.message}
        autoComplete="current-password"
        rightAction={
          <button
            type="button"
            className="text-[11px] font-medium text-accent hover:underline"
          >
            {t('forgotCredentials')}
          </button>
        }
        {...register('password')}
      />

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting || loginMutation.isPending}
        className="w-full"
      >
        {t('submit')}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        {t('noAccount')}{' '}
        <Link href={`/${locale}/register`} className="text-accent hover:underline font-medium">
          {t('register')}
        </Link>
      </p>
    </form>
  );
}
