'use client';

import { useQuery } from '@tanstack/react-query';
import { getBroker } from '@/lib/api/brokers';
import { queryKeys } from '@/lib/query/keys';
import { config } from '@/lib/config';

export function useBroker(slug: string) {
  return useQuery({
    queryKey: queryKeys.brokers.detail(slug),
    queryFn: () => getBroker(slug),
    staleTime: config.query.brokerDetailStaleTime,
    enabled: !!slug,
  });
}
