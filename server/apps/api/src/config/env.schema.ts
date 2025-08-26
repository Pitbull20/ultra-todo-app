import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(4000),
    API_PREFIX: z.string().default('/api'),
    API_VERSION: z.string().default('v1'),

    JWT_ACCESS_SECRET: z.string().min(16),
    JWT_ACCESS_EXPIRES: z.coerce.number().default(900),
    JWT_REFRESH_SECRET: z.string().min(16),
    JWT_REFRESH_EXPIRES: z.coerce.number().default(2592000),

    CORS_ORIGINS: z.string().optional(),

    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string(),

    AN_DB_HOST: z.string().optional(),
    AN_DB_PORT: z.coerce.number().optional(),
    AN_DB_USER: z.string().optional(),
    AN_DB_PASS: z.string().optional(),
    AN_DB_NAME: z.string().optional(),

    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number().default(6379),

    RATE_TTL: z.coerce.number().default(60),
    RATE_LIMIT: z.coerce.number().default(100),
});
export type Env = z.infer<typeof envSchema>;
