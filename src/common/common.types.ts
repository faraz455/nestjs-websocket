export const EnvironmentVars = {
  JWT_SECRET: "JWT_SECRET",
  LOG_QUERIES: "LOG_QUERIES",
  LOG_REQUESTS: "LOG_REQUESTS",
  AUTH_COOKIE_SECRET: "AUTH_COOKIE_SECRET",
  DATABASE_URL: "DATABASE_URL",
  PRODUCTION: "PRODUCTION",
} as const;

export type EnvironmentVars = keyof typeof EnvironmentVars;
