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
import { ArrowRight } from "lucide-react";

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
      onSuccess: () => router.push(`/${locale}/login`),
      onError: () => setServerError(t("error")),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label={t("fullName")}
        placeholder={t("fullNamePlaceholder")}
        error={errors.fullName?.message}
        autoComplete="name"
        {...register("fullName")}
      />

      <Input
        label={t("email")}
        type="email"
        placeholder={t("emailPlaceholder")}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t("password")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          error={errors.password?.message}
          autoComplete="new-password"
          {...register("password")}
        />
        <Input
          label={t("confirmPassword")}
          type="password"
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
      {errors.agreeToTerms && (
        <p className="text-xs text-red-400 -mt-6">{errors.agreeToTerms.message}</p>
      )}

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting || registerMutation.isPending}
        className="w-full"
      >
        {t("submit")}
        <ArrowRight size={16} aria-hidden="true" className="ml-2" />
      </Button>

      <hr className="text-ink-dim/10 my-4" />

      <p className="text-center text-sm text-ink-muted my-6">
        {t("alreadyVerified")}{" "}
        <Link
          href={`/${locale}/login`}
          className="text-logo font-medium hover:underline"
        >
          {t("loginLink")}
        </Link>
      </p>
    </form>
  );
}
