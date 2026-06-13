import { z } from 'zod';

export const BrokerTypeSchema = z.enum(['CFD', 'Bond', 'Stock', 'Crypto']);

export const BrokerSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  type: BrokerTypeSchema,
  logoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  website: z.string().url().optional(),
  badge: z.string().optional(),
  tag: z.string().optional(),
  icon: z.string().optional(),
});

export const BrokerFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const PerformanceMetricsSchema = z.object({
  aumGrowthYoY: z.string().optional(),
  liquidityAccess: z.string().optional(),
  liquidityAccessSub: z.string().optional(),
  clientRetention: z.string().optional(),
  clientRetentionPeriod: z.string().optional(),
});

export const ContactInfoSchema = z.object({
  address: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const MarketStatsSchema = z.object({
  forexPairs: z.number().optional(),
  indices: z.number().optional(),
  commodities: z.number().optional(),
  equities: z.number().optional(),
  sovereignBonds: z.number().optional(),
  cryptoEtps: z.number().optional(),
});

export const BrokerDetailSchema = BrokerSchema.extend({
  grade: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  prospectusUrl: z.string().url().optional(),
  longDescription: z.string().optional(),
  features: z.array(BrokerFeatureSchema).optional(),
  metrics: PerformanceMetricsSchema.optional(),
  contact: ContactInfoSchema.optional(),
  markets: MarketStatsSchema.optional(),
});

export const BrokersResponseSchema = z.object({
  brokers: z.array(BrokerSchema),
  total: z.number(),
});

export const BrokerDetailResponseSchema = z.object({
  broker: BrokerDetailSchema,
});

export const CreateBrokerSchema = z.object({
  name: z.string().min(2, 'Broker name is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  type: BrokerTypeSchema,
  logoUrl: z.url({ error: 'Must be a valid URL' }),
  website: z.url({ error: 'Must be a valid URL' }),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

export type Broker = z.infer<typeof BrokerSchema>;
export type BrokerDetail = z.infer<typeof BrokerDetailSchema>;
export type BrokersResponse = z.infer<typeof BrokersResponseSchema>;
export type BrokerDetailResponse = z.infer<typeof BrokerDetailResponseSchema>;
export type CreateBrokerInput = z.infer<typeof CreateBrokerSchema>;
