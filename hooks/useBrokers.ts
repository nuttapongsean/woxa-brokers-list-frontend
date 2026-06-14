'use client';

import { useQuery } from '@tanstack/react-query';
import { getBrokers } from '@/lib/api/brokers';
import { queryKeys } from '@/lib/query/keys';
import { config } from '@/lib/config';

export function useBrokers(filters?: { brokerType?: string; search?: string }) {
  return useQuery({
    queryKey: queryKeys.brokers.list(filters),
    queryFn: () => getBrokers(filters),
    staleTime: config.query.brokerListStaleTime,
  });
}
