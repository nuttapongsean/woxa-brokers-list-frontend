export type { BrokerType, Broker, BrokerDetail, BrokersResponse, CreateBrokerInput } from '@/lib/schemas/broker';

export type Locale = 'en' | 'th';

export interface ApiError {
  message: string;
  status: number;
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
  agreeToTerms: boolean;
}
