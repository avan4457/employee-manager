import env from './env'

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${env.PROJECT_NAME} API`,
      version: '1.0.0',
      description: `${env.PROJECT_NAME} Server Endpoints`,
    },
    servers: [
      {
        url: env.API_BASE_URL || '',
      },
    ],
  },
  apis: ['./routes/*.ts'],
}
