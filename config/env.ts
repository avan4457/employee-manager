import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: process.env.SERVER_PORT || 8080,
  PROJECT_NAME: process.env.PROJECT_NAME || '<project_name>',
  IS_DEV: process.env?.IS_DEV || false,
  IS_LOCAL: process.env?.IS_LOCAL || false,
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
}

export default env
