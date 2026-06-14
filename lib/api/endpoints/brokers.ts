export const brokerEndpoints = {
  list:   '/brokers',
  submit: '/brokers',
  slugs:  '/brokers/slugs',
  types:  '/brokers/types',
  detail: (slug: string) => `/brokers/${slug}`,
} as const;
