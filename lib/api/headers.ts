export const httpHeaders = {
  contentType: "Content-Type",
  authorization: "Authorization",
  requestId: "X-Request-ID",
} as const;

export const headerValues = {
  json: "application/json",
  bearer: (token: string) => `Bearer ${token}`,
} as const;
