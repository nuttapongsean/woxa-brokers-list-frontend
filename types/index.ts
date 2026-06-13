export type Locale = 'en' | 'th';
export type BrokerType = 'CFD' | 'Bond' | 'Stock' | 'Crypto';

export interface Broker {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: BrokerType;
  logoUrl?: string;
  imageUrl?: string;
  website?: string;
  badge?: string;
  tag?: string;
  icon?: string;
}

export interface BrokerFeature {
  title: string;
  description: string;
}

export interface PerformanceMetrics {
  aumGrowthYoY?: string;
  liquidityAccess?: string;
  liquidityAccessSub?: string;
  clientRetention?: string;
  clientRetentionPeriod?: string;
}

export interface ContactInfo {
  address?: string;
  email?: string;
  website?: string;
}

export interface MarketStats {
  forexPairs?: number;
  indices?: number;
  commodities?: number;
  equities?: number;
  sovereignBonds?: number;
  cryptoEtps?: number;
}

export interface BrokerDetail extends Broker {
  grade?: string;
  rating?: number;
  prospectusUrl?: string;
  longDescription?: string;
  features?: BrokerFeature[];
  metrics?: PerformanceMetrics;
  contact?: ContactInfo;
  markets?: MarketStats;
}

export interface BrokersResponse {
  brokers: Broker[];
  total: number;
}

export interface BrokerDetailResponse {
  broker: BrokerDetail;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface CreateBrokerInput {
  name: string;
  slug: string;
  type: BrokerType;
  logoUrl?: string;
  website?: string;
  description: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
