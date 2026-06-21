"use client";

import {
  useForm,
  Controller,
  useFieldArray,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  CreateBrokerSchema,
  type CreateBrokerInput,
  type BrokerType,
} from "@/lib/schemas/broker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { FileUpload } from "@/components/ui/FileUpload";
import { submitBroker } from "@/lib/api/brokers";
import { useState, useEffect } from "react";
import { Plus, X, Globe, MapPin, Mail } from "lucide-react";

interface SubmitBrokerFormProps {
  locale: string;
}

const BROKER_TYPES: { value: BrokerType; label: string }[] = [
  { value: "cfd", label: "CFD" },
  { value: "bond", label: "Bond" },
  { value: "stock", label: "Stock" },
  { value: "crypto", label: "Crypto" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-logo border-b border-line pb-3 pt-4 mt-3">
      {title}
    </h3>
  );
}

export function SubmitBrokerForm({ locale }: SubmitBrokerFormProps) {
  const t = useTranslations("submitBroker");
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [logoError, setLogoError] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [prospectusFiles, setProspectusFiles] = useState<File[]>([]);
  const [slugSuffix] = useState(() => Math.random().toString(36).slice(2, 7));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateBrokerInput>({
    resolver: zodResolver(CreateBrokerSchema) as Resolver<CreateBrokerInput>,
    defaultValues: { features: [] },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const watchedName = useWatch({ control, name: "name" });
  useEffect(() => {
    const base = (watchedName ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setValue("slug", base ? `${base}-${slugSuffix}` : "", {
      shouldValidate: false,
    });
  }, [watchedName, slugSuffix, setValue]);

  async function onSubmit(data: CreateBrokerInput) {
    if (logoFiles.length === 0 || imageFiles.length === 0) return;
    setServerError("");
    try {
      await submitBroker(data, {
        logo: logoFiles[0],
        coverImage: imageFiles[0],
        prospectus: prospectusFiles[0],
      });
      router.push(`/${locale}/brokers`);
    } catch {
      setServerError(t("error"));
    }
  }

  function handleFormSubmit(e: React.SyntheticEvent) {
    const noLogo = logoFiles.length === 0;
    const noImage = imageFiles.length === 0;
    setLogoError(noLogo ? "Required" : "");
    setImageError(noImage ? "Required" : "");
    handleSubmit(onSubmit)(e);
  }

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
      {/* ── Basic Info ── */}
      <SectionHeader title={t("sections.basicInfo")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t("fields.brokerName")}
          placeholder={t("fields.brokerNamePlaceholder")}
          error={errors.name?.message}
          required
          {...register("name")}
        />
        <Input
          label={t("fields.slug")}
          tooltip={t("fields.slugTooltip")}
          placeholder={t("fields.slugPlaceholder")}
          error={errors.slug?.message}
          required
          {...register("slug")}
        />
      </div>
      <Controller
        name="brokerType"
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={field.name}
            label={t("fields.brokerType")}
            tooltip={t("fields.brokerTypeTooltip")}
            required
            orientation="horizontal"
            options={BROKER_TYPES}
            value={field.value}
            onChange={field.onChange}
            error={errors.brokerType?.message}
          />
        )}
      />

      {/* ── Descriptions ── */}
      <SectionHeader title={t("sections.descriptions")} />
      <Textarea
        label={t("fields.description")}
        placeholder={t("fields.descriptionPlaceholder")}
        rows={3}
        maxLength={100}
        required
        error={errors.description?.message}
        {...register("description")}
      />
      <Textarea
        label={t("fields.longDescription")}
        placeholder={t("fields.longDescriptionPlaceholder")}
        rows={5}
        maxLength={500}
        required
        error={errors.longDescription?.message}
        {...register("longDescription")}
      />

      {/* ── Media & Links ── */}
      <SectionHeader title={t("sections.mediaLinks")} />

      <FileUpload
        label={t("fields.logoUrl")}
        required
        accept="image/png, image/jpeg, image/webp"
        maxSizeMb={2}
        value={logoFiles}
        error={logoError}
        onChange={(files) => {
          setLogoFiles(files);
          if (files.length > 0) setLogoError("");
        }}
      />
      <FileUpload
        label={t("fields.imageUrl")}
        required
        accept="image/png, image/jpeg, image/webp"
        maxSizeMb={2}
        value={imageFiles}
        error={imageError}
        onChange={(files) => {
          setImageFiles(files);
          if (files.length > 0) setImageError("");
        }}
      />
      <Input
        label={t("fields.website")}
        placeholder={t("fields.websitePlaceholder")}
        error={errors.website?.message}
        iconLeft={<Globe size={16} aria-hidden="true" />}
        {...register("website")}
      />
      <FileUpload
        label={t("fields.prospectusUrl")}
        accept=".pdf,.doc,.docx"
        maxSizeMb={10}
        value={prospectusFiles}
        onChange={setProspectusFiles}
      />

      {/* ── Contact ── */}
      <SectionHeader title={t("sections.contact")} />
      <Input
        label={t("fields.contactAddress")}
        placeholder={t("fields.contactAddressPlaceholder")}
        error={errors.contactAddress?.message}
        required
        iconLeft={<MapPin size={16} aria-hidden="true" />}
        {...register("contactAddress")}
      />
      <Input
        label={t("fields.contactEmail")}
        placeholder={t("fields.contactEmailPlaceholder")}
        error={errors.contactEmail?.message}
        required
        iconLeft={<Mail size={16} aria-hidden="true" />}
        {...register("contactEmail")}
      />

      {/* ── Key Features (dynamic rows) ── */}
      <SectionHeader title={t("sections.features")} />
      <div className="space-y-3">
        {featureFields.map((field, index) => (
          <div
            key={field.id}
            className="relative bg-surface-2 rounded-lg border border-line p-4 space-y-3"
          >
            <button
              type="button"
              aria-label={t("fields.removeFeature")}
              onClick={() => removeFeature(index)}
              className="absolute top-3 right-3 text-ink-dim hover:text-line-focus transition-colors"
            >
              <X size={15} aria-hidden="true" />
            </button>
            <Input
              label={t("fields.featureTitle")}
              placeholder={t("fields.featureTitlePlaceholder")}
              required
              error={errors.features?.[index]?.title?.message}
              {...register(`features.${index}.title`)}
            />
            <Textarea
              label={t("fields.featureDescription")}
              placeholder={t("fields.featureDescriptionPlaceholder")}
              rows={4}
              required
              error={errors.features?.[index]?.description?.message}
              {...register(`features.${index}.description`)}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendFeature({ title: "", description: "" })}
          className="gap-1.5"
        >
          <Plus size={14} aria-hidden="true" />
          {t("fields.addFeature")}
        </Button>
      </div>

      {/* ── Performance Metrics ── */}
      <SectionHeader title={t("sections.metrics")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Input
          type="number"
          label={t("fields.aumGrowthYoY")}
          placeholder="34.2"
          error={errors.metrics?.aumGrowthYoY?.message}
          required
          {...register("metrics.aumGrowthYoY")}
        />
        <Input
          type="number"
          label={t("fields.liquidityAccess")}
          placeholder="18.4"
          error={errors.metrics?.liquidityAccess?.message}
          required
          {...register("metrics.liquidityAccess")}
        />
        <Input
          type="number"
          label={t("fields.clientRetention")}
          placeholder="94.7"
          error={errors.metrics?.clientRetention?.message}
          required
          {...register("metrics.clientRetention")}
        />
      </div>

      {/* ── Available Markets ── */}
      <SectionHeader title={t("sections.markets")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          type="number"
          label={t("fields.forexPairs")}
          placeholder="185"
          error={errors.markets?.forexPairs?.message}
          required
          {...register("markets.forexPairs")}
        />
        <Input
          type="number"
          label={t("fields.indices")}
          placeholder="40"
          error={errors.markets?.indices?.message}
          required
          {...register("markets.indices")}
        />
        <Input
          type="number"
          label={t("fields.commodities")}
          placeholder="35"
          error={errors.markets?.commodities?.message}
          required
          {...register("markets.commodities")}
        />
        <Input
          type="number"
          label={t("fields.equities")}
          placeholder="23000"
          error={errors.markets?.equities?.message}
          required
          {...register("markets.equities")}
        />
        <Input
          type="number"
          label={t("fields.sovereignBonds")}
          placeholder="9500"
          error={errors.markets?.sovereignBonds?.message}
          required
          {...register("markets.sovereignBonds")}
        />
        <Input
          type="number"
          label={t("fields.cryptoEtps")}
          placeholder="25"
          error={errors.markets?.cryptoEtps?.message}
          required
          {...register("markets.cryptoEtps")}
        />
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-3 py-8">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          {t("actions.discard")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {t("actions.submit")}
        </Button>
      </div>
    </form>
  );
}
