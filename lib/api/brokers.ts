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

export interface SubmitBrokerFiles {
  logo: File;
  coverImage: File;
  prospectus?: File;
}

export async function submitBroker(
  data: CreateBrokerInput,
  files: SubmitBrokerFiles
): Promise<{ id: string }> {
  if (config.useMock) return mockBrokers.submitBroker(data);

  const form = new FormData();

  // Scalar fields
  const scalarKeys = [
    'name', 'slug', 'brokerType', 'description', 'longDescription',
    'website', 'contactAddress', 'contactEmail',
  ] as const;
  for (const key of scalarKeys) {
    const val = data[key];
    if (val !== undefined && val !== '') form.append(key, String(val));
  }

  // Features — JSON string (multipart/form-data cannot carry arrays)
  if (data.features && data.features.length > 0) {
    form.append('features', JSON.stringify(data.features));
  }

  // Metrics — dot-notation fields
  if (data.metrics) {
    const m = data.metrics;
    if (m.aumGrowthYoY)    form.append('metrics.aumGrowthYoY',    m.aumGrowthYoY);
    if (m.liquidityAccess) form.append('metrics.liquidityAccess',  m.liquidityAccess);
    if (m.clientRetention) form.append('metrics.clientRetention',  m.clientRetention);
  }

  // Markets — dot-notation fields
  if (data.markets) {
    const mk = data.markets;
    const marketKeys = [
      'forexPairs', 'indices', 'commodities',
      'equities', 'sovereignBonds', 'cryptoEtps',
    ] as const;
    for (const key of marketKeys) {
      if (mk[key] !== undefined) form.append(`markets.${key}`, String(mk[key]));
    }
  }

  // Files
  form.append('logo', files.logo);
  form.append('coverImage', files.coverImage);
  if (files.prospectus) form.append('prospectus', files.prospectus);

  const response = await apiClient.post(brokerEndpoints.submit, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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

export async function suggestSlug(name: string): Promise<string> {
  if (config.useMock) return mockBrokers.suggestSlug(name);

  const response = await apiClient.get<{ slug: string }>(brokerEndpoints.suggestSlug, {
    params: { name },
  });
  return response.data.slug;
}
