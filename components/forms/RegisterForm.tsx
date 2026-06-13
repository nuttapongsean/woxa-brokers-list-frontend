"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/schemas/auth";
import type { RegisterInput } from "@/types";
import { useRegister } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

interface RegisterFormProps {
  locale: string;
}

export function RegisterForm({ locale }: RegisterFormProps) {
  const t = useTranslations("register");
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setServerError("");
    registerMutation.mutate(data, {
      onSuccess: () => router.push(`/${locale}/brokers`),
      onError: () => setServerError(t("error")),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label={t("fullName")}
        labelClassName="font-normal text-ink/70"
        className="bg-register-form border border-transparent placeholder:text-ink-dim/50 focus:bg-register-form focus:border-accent/40"
        placeholder={t("fullNamePlaceholder")}
        error={errors.fullName?.message}
        autoComplete="name"
        {...register("fullName")}
      />

      <Input
        label={t("email")}
        labelClassName="font-normal text-ink/70"
        type="email"
        className="bg-register-form border border-transparent placeholder:text-ink-dim/50 focus:bg-register-form focus:border-accent/40"
        placeholder={t("emailPlaceholder")}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t("password")}
          labelClassName="font-normal text-ink/70"
          type="password"
          className="bg-register-form border border-transparent placeholder:text-ink-dim/50 focus:bg-register-form focus:border-accent/40"
          placeholder={t("passwordPlaceholder")}
          error={errors.password?.message}
          autoComplete="new-password"
          {...register("password")}
        />
        <Input
          label={t("confirmPassword")}
          labelClassName="font-normal text-ink/70"
          type="password"
          className="bg-register-form border border-transparent placeholder:text-ink-dim/50 focus:bg-register-form focus:border-accent/40"
          placeholder={t("confirmPasswordPlaceholder")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group my-8">
        <input
          type="checkbox"
          className="mt-1 checkbox-custom"
          {...register("agreeToTerms")}
        />
        <p className="text-sm text-ink leading-relaxed">
          {t("agreement")}{" "}
          <a href="#" className="hover:underline text-logo">
            {t("agreementLink")}
          </a>{" "}
          {t("and")}{" "}
          <a href="#" className="hover:underline text-logo">
            {t("privacyLink")}
          </a>
          .
        </p>
      </label>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting || registerMutation.isPending}
        className="w-full text-black"
      >
        {t("submit")}
      </Button>

      <hr className="text-ink-dim/10 my-4" />

      <p className="text-center text-sm text-ink-muted my-6">
        {t("alreadyVerified")}{" "}
        <Link
          href={`/${locale}/login`}
          className="text-accent hover:underline font-medium  text-logo"
        >
          {t("loginLink")}
        </Link>
      </p>
    </form>
  );
}
