'use client';

import { useQuery } from '@tanstack/react-query';
import { getBrokerTypes } from '@/lib/api/brokers';
import { queryKeys } from '@/lib/query/keys';

export function useBrokerTypes() {
  return useQuery({
    queryKey: queryKeys.brokers.types(),
    queryFn: getBrokerTypes,
    staleTime: Infinity,
  });
}
