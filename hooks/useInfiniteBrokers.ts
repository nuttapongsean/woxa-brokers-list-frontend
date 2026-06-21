'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getBrokers } from '@/lib/api/brokers';
import { queryKeys } from '@/lib/query/keys';
import { config } from '@/lib/config';

const PAGE_SIZE = 9;

export function useInfiniteBrokers(params?: { brokerType?: string }) {
  return useInfiniteQuery({
    queryKey: queryKeys.brokers.infinite(params),
    queryFn: ({ pageParam }) =>
      getBrokers({ ...params, page: pageParam as number, limit: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.brokers.length, 0);
      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
    staleTime: config.query.brokerListStaleTime,
  });
}
