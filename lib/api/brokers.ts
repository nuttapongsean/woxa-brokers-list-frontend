import { apiClient } from './client';
import { config } from '@/lib/config';
import { mockBrokers } from '@/lib/mock/handlers';
import { brokerEndpoints } from './endpoints';
import {
  BrokersResponseSchema,
  BrokerDetailResponseSchema,
  type BrokersResponse,
  type BrokerDetailResponse,
  type CreateBrokerInput,
} from '../schemas/broker';

export async function getBrokers(params?: {
  type?: string;
  search?: string;
}): Promise<BrokersResponse> {
  if (config.useMock) return mockBrokers.getBrokers(params);

  const response = await apiClient.get(brokerEndpoints.list, { params });
  return BrokersResponseSchema.parse(response.data);
}

export async function getBroker(slug: string): Promise<BrokerDetailResponse> {
  if (config.useMock) return mockBrokers.getBroker(slug);

  const response = await apiClient.get(brokerEndpoints.detail(slug));
  return BrokerDetailResponseSchema.parse(response.data);
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
