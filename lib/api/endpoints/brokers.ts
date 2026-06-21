export const brokerEndpoints = {
  list:        '/brokers',
  submit:      '/brokers',
  slugs:       '/brokers/slugs',
  types:       '/brokers/types',
  suggestSlug: '/brokers/suggest-slug',
  detail:      (slug: string) => `/brokers/${slug}`,
} as const;
