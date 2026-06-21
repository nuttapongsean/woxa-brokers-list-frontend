export const queryKeys = {
  brokers: {
    all: () => ['brokers'] as const,
    list: (filters?: { brokerType?: string; search?: string }) =>
      [...queryKeys.brokers.all(), 'list', filters] as const,
    infinite: (filters?: { brokerType?: string }) =>
      [...queryKeys.brokers.all(), 'infinite', filters] as const,
    detail: (slug: string) => [...queryKeys.brokers.all(), 'detail', slug] as const,
    types: () => [...queryKeys.brokers.all(), 'types'] as const,
  },
  auth: {
    me: () => ['auth', 'me'] as const,
  },
};
