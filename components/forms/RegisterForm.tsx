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
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  locale: string;
}

export function RegisterForm({ locale }: RegisterFormProps) {
  const t = useTranslations("register");
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
          type={showPassword ? "text" : "password"}
          placeholder={t("passwordPlaceholder")}
          error={errors.password?.message}
          autoComplete="new-password"
          rightAction={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword
                ? <EyeOff size={15} aria-hidden="true" />
                : <Eye size={15} aria-hidden="true" />}
            </Button>
          }
          {...register("password")}
        />
        <Input
          label={t("confirmPassword")}
          type={showConfirm ? "text" : "password"}
          placeholder={t("confirmPasswordPlaceholder")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          rightAction={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm
                ? <EyeOff size={15} aria-hidden="true" />
                : <Eye size={15} aria-hidden="true" />}
            </Button>
          }
          {...register("confirmPassword")}
        />
      </div>

      <div className="my-4">
        <Checkbox
          labelContent={
            <span>
              {t("agreement")}{" "}
              <Link href={`/${locale}/terms`} className="text-logo hover:underline">
                {t("agreementLink")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href={`/${locale}/privacy`} className="text-logo hover:underline">
                {t("privacyLink")}
              </Link>
              .
            </span>
          }
          error={errors.agreeToTerms?.message}
          {...register("agreeToTerms")}
        />
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting || registerMutation.isPending}
        className="w-full"
      >
        {t("submit")}
      </Button>

      <hr className="text-ink-dim/10 my-4" />

      <p className="text-center text-sm text-ink-muted my-6">
        {t("alreadyVerified")}{" "}
        <Link href={`/${locale}/login`} className="text-logo font-medium hover:underline">
          {t("loginLink")}
        </Link>
      </p>
    </form>
  );
}
