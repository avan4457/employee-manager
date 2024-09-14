import env from './config/env';

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./models/schema.ts",
  out: "./models",
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
})