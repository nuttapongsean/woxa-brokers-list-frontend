import { z } from 'zod';

export const BrokerTypeSchema = z.enum(['cfd', 'bond', 'stock', 'crypto']);

export const BrokerSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  brokerType: BrokerTypeSchema,
  logoUrl: z.string().url().nullish(),
  imageUrl: z.string().url().nullish(),
  website: z.string().url().nullish(),
  badge: z.string().nullish(),
  tag: z.string().nullish(),
  icon: z.string().nullish(),
});

export const BrokerFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  sortOrder: z.number().optional(),
});

export const PerformanceMetricsSchema = z.object({
  aumGrowthYoY: z.string().nullish(),
  liquidityAccess: z.string().nullish(),
  liquidityAccessSub: z.string().nullish(),
  clientRetention: z.string().nullish(),
  clientRetentionPeriod: z.string().nullish(),
});

export const MarketStatsSchema = z.object({
  forexPairs: z.number().nullish(),
  indices: z.number().nullish(),
  commodities: z.number().nullish(),
  equities: z.number().nullish(),
  sovereignBonds: z.number().nullish(),
  cryptoEtps: z.number().nullish(),
});

export const BrokerDetailSchema = BrokerSchema.extend({
  grade: z.string().nullish(),
  rating: z.number().min(1).max(5).nullish(),
  prospectusUrl: z.string().url().nullish(),
  longDescription: z.string().nullish(),
  contactAddress: z.string().nullish(),
  contactEmail: z.string().email().nullish(),
  features: z.array(BrokerFeatureSchema).optional(),
  metrics: PerformanceMetricsSchema.nullish(),
  markets: MarketStatsSchema.nullish(),
});

// Real API list response: { data: [], total, totalPages }
export const BrokersListResponseSchema = z.object({
  data: z.array(BrokerSchema),
  total: z.number(),
  totalPages: z.number(),
});

// Frontend-normalised shape returned by getBrokers()
export const BrokersResponseSchema = z.object({
  brokers: z.array(BrokerSchema),
  total: z.number(),
});

export const CreateBrokerSchema = z.object({
  name: z.string().min(2, 'Broker name is required'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only')
    .optional(),
  brokerType: BrokerTypeSchema,
  logoUrl: z.string().url('Must be a valid URL'),
  website: z.string().url('Must be a valid URL'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

export type BrokerType = z.infer<typeof BrokerTypeSchema>;
export type Broker = z.infer<typeof BrokerSchema>;
export type BrokerDetail = z.infer<typeof BrokerDetailSchema>;
export type BrokersResponse = z.infer<typeof BrokersResponseSchema>;
export type CreateBrokerInput = z.infer<typeof CreateBrokerSchema>;
export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;
export type MarketStats = z.infer<typeof MarketStatsSchema>;
