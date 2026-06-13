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
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  locale: string;
}

export function LoginForm({ locale }: LoginFormProps) {
  const t = useTranslations('login');
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        labelClassName="text-ink/70"
        className="border-ink/30"
        type="email"
        placeholder={t('emailPlaceholder')}
        error={errors.email?.message}
        autoComplete="email"
        iconLeft={<AtSign size={15} />}
        {...register('email')}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-ink/70">
            {t('password')}
          </label>
          <button
            type="button"
            className="text-[10px] text-logo tracking-wide uppercase hover:brightness-80"
          >
            {t('forgotCredentials')}
          </button>
        </div>
        <Input
          className="border-ink/30"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('passwordPlaceholder')}
          error={errors.password?.message}
          autoComplete="current-password"
          iconLeft={<Lock size={15} />}
          rightAction={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-ink-dim hover:text-ink transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
          {...register('password')}
        />
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting || loginMutation.isPending}
        className="w-full mt-6 hover:brightness-80"
      >
        {t('submit')}
      </Button>

      <hr className="text-ink-dim/10 my-4"/>

      <p className="text-center text-sm text-ink-muted p-6">
        {t('noAccount')}{' '}
        <Link href={`/${locale}/register`} className="text-logo font-medium hover:brightness-80">
          {t('register')}
        </Link>
      </p>
    </form>
  );
}