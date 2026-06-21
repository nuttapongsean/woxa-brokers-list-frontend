import type { BrokerDetail, BrokersResponse, CreateBrokerInput } from '../schemas/broker';
import type { LoginInput, RegisterInput, AuthTokens } from '../schemas/auth';
import { MOCK_BROKERS, MOCK_BROKERS_RESPONSE, MOCK_AUTH_RESPONSE } from './data';

const MOCK_DELAY = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockBrokers = {
  async getBrokers(params?: { brokerType?: string; search?: string; page?: number; limit?: number }): Promise<BrokersResponse> {
    await delay(MOCK_DELAY);

    let brokers = MOCK_BROKERS;

    if (params?.brokerType) {
      brokers = brokers.filter((b) => b.brokerType === params.brokerType);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      brokers = brokers.filter(
        (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q),
      );
    }

    const total = brokers.length;

    if (params?.page !== undefined && params?.limit !== undefined) {
      const start = (params.page - 1) * params.limit;
      brokers = brokers.slice(start, start + params.limit);
    }

    return { brokers, total };
  },

  async getBroker(slug: string): Promise<BrokerDetail> {
    await delay(MOCK_DELAY);

    const broker = MOCK_BROKERS.find((b) => b.slug === slug);
    if (!broker) throw new Error(`Mock: broker "${slug}" not found`);

    return broker;
  },

  async submitBroker(_data: CreateBrokerInput): Promise<{ id: string }> {
    await delay(MOCK_DELAY);
    return { id: `mock-${Date.now()}` };
  },

  async getBrokerSlugs(): Promise<string[]> {
    await delay(MOCK_DELAY);
    return MOCK_BROKERS_RESPONSE.brokers.map((b) => b.slug);
  },

  async getBrokerTypes(): Promise<string[]> {
    await delay(MOCK_DELAY);
    return [...new Set(MOCK_BROKERS.map((b) => b.brokerType))];
  },
};

export const mockAuth = {
  async login(_data: LoginInput): Promise<AuthTokens> {
    await delay(MOCK_DELAY);
    return MOCK_AUTH_RESPONSE;
  },

  async register(_data: Omit<RegisterInput, 'confirmPassword'>): Promise<AuthTokens> {
    await delay(MOCK_DELAY);
    return MOCK_AUTH_RESPONSE;
  },

  async logout(): Promise<void> {
    await delay(MOCK_DELAY);
  },
};
