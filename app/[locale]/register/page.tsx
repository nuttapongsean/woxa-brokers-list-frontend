import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Landmark, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { config } from "@/lib/config";

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.register" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false },
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "register" });

  return (
    <div className="min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left hero panel */}
      <div
        className="hidden lg:flex flex-col justify-end p-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(${config.images.loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #070d1a 0%, rgba(7, 13, 26, 0.4) 50%, rgba(7, 13, 26, 0) 100%)",
            zIndex: 1,
          }}
        />

        <div className="relative z-10">
          <h2 className="font-display text-[18px] font-semibold text-logo flex items-center gap-2">
            <Landmark size={18} />
            {t("brandName")}
          </h2>
          <h1 className="font-display text-[60px] font-bold text-ink leading-[1.15] my-6">
            {t("heroTitle")}
          </h1>
          <p className="text-[14px] text-ink-muted leading-relaxed">
            {t("heroDesc")}
          </p>
          <div className="flex gap-8 mt-16 mb-4">
            <div>
              <span className="font-display text-[28px] font-bold text-logo">
                $2.4T+
              </span>
              <p className="text-[12px] uppercase tracking-widest text-ink-dim">
                {t("stats.managedCapital")}
              </p>
            </div>
            <div>
              <span className="font-display text-[28px] font-bold text-logo">
                99.98%
              </span>
              <p className="text-[12px] uppercase tracking-widest text-ink-dim">
                {t("stats.uptimeSla")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="bg-surface flex flex-col justify-center px-8 lg:px-14 py-12">
        <div className="w-full max-w-[512px] mx-auto">
          <h2 className="font-display text-3xl font-bold text-ink mb-1">
            {t("formTitle")}
          </h2>
          <p className="text-sm text-ink-muted mb-7">{t("formDesc")}</p>

          <RegisterForm locale={locale} />

          {/* Compliance badges */}
          <div className="flex items-center justify-center gap-8 mt-20">
            {[t("badges.aes"), t("badges.gdpr"), t("badges.sec")].map(
              (label, i) => (
                <span key={label} className="flex items-center gap-1.5 text-[10px] uppercase text-ink-dim">
                  {i === 0 && <ShieldCheck size={12}/>}
                  {label}
                </span>
              ),
            )}
          </div>
          <div className="flex items-center justify-center">
            <span className="text-[10px] uppercase text-ink-dim">
              {t("copyright")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
