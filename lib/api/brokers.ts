import { apiClient } from './client';
import { config } from '@/lib/config';
import { mockBrokers } from '@/lib/mock/handlers';
import { brokerEndpoints } from './endpoints';
import {
  BrokersListResponseSchema,
  BrokerDetailSchema,
  type BrokersResponse,
  type BrokerDetail,
  type CreateBrokerInput,
} from '../schemas/broker';

export async function getBrokers(params?: {
  brokerType?: string;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<BrokersResponse> {
  if (config.useMock) return mockBrokers.getBrokers(params);

  // search is client-side only — strip before sending to API
  const { search: _search, ...apiParams } = params ?? {};
  const response = await apiClient.get(brokerEndpoints.list, { params: apiParams });
  const parsed = BrokersListResponseSchema.parse(response.data);
  return { brokers: parsed.data, total: parsed.total };
}

export async function getBroker(slug: string): Promise<BrokerDetail> {
  if (config.useMock) return mockBrokers.getBroker(slug);

  const response = await apiClient.get(brokerEndpoints.detail(slug));
  return BrokerDetailSchema.parse(response.data);
}

export async function submitBroker(data: CreateBrokerInput): Promise<{ id: string }> {
  if (config.useMock) return mockBrokers.submitBroker(data);

  const response = await apiClient.post(brokerEndpoints.submit, data);
  return response.data;
}

export async function getBrokerSlugs(): Promise<string[]> {
  if (config.useMock) return mockBrokers.getBrokerSlugs();

  const response = await apiClient.get(brokerEndpoints.slugs);
  return response.data;
}

export async function getBrokerTypes(): Promise<string[]> {
  if (config.useMock) return mockBrokers.getBrokerTypes();

  const response = await apiClient.get(brokerEndpoints.types);
  return response.data;
}
