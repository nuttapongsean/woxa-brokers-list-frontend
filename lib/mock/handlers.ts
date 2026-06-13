import type { BrokersResponse, BrokerDetailResponse, CreateBrokerInput } from '../schemas/broker';
import type { LoginInput, RegisterInput, AuthResponse } from '../schemas/auth';
import { MOCK_BROKERS, MOCK_BROKERS_RESPONSE, MOCK_AUTH_RESPONSE } from './data';

const MOCK_DELAY = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockBrokers = {
  async getBrokers(params?: { type?: string; search?: string }): Promise<BrokersResponse> {
    await delay(MOCK_DELAY);

    let brokers = MOCK_BROKERS;

    if (params?.type) {
      brokers = brokers.filter((b) => b.type === params.type);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      brokers = brokers.filter(
        (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
      );
    }

    return { brokers, total: brokers.length };
  },

  async getBroker(slug: string): Promise<BrokerDetailResponse> {
    await delay(MOCK_DELAY);

    const broker = MOCK_BROKERS.find((b) => b.slug === slug);
    if (!broker) throw new Error(`Mock: broker "${slug}" not found`);

    return { broker };
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
    return [...new Set(MOCK_BROKERS.map((b) => b.type))];
  },
};

export const mockAuth = {
  async login(_data: LoginInput): Promise<AuthResponse> {
    await delay(MOCK_DELAY);
    return MOCK_AUTH_RESPONSE;
  },

  async register(_data: Omit<RegisterInput, 'confirmPassword'>): Promise<AuthResponse> {
    await delay(MOCK_DELAY);
    return MOCK_AUTH_RESPONSE;
  },

  async logout(): Promise<void> {
    await delay(MOCK_DELAY);
  },

  async getMe(): Promise<AuthResponse> {
    await delay(200);
    // mock: ไม่ได้ login — throw 401 เพื่อให้ useMe() return undefined
    throw Object.assign(new Error('Unauthorized'), { status: 401 });
  },
};
