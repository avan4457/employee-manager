import './config/env'
import env from './config/env'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerConfig from './config/swaggerConfig'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import csurf from 'csurf'
import express, { Application, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import employeeRouter from './routes/employee'

// API documentation
const specs = swaggerJsDoc(swaggerConfig) // swagger config options

const app: Application = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(
  cors({
    origin: [env.CLIENT_BASE_URL || ''],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }),
) // control domain access - update as required

app.use(helmet()) // setting necessary HTTP headers

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 60,
})

app.use(limiter) // limit each IP to 100 requests per windowMs

app.use(cookieParser()) // required for csurf

if (env.IS_DEV == 'true') {
  app.get('/', (req: Request, res: Response) => {
    res.send(
      `<h2 style='text-align:center;margin-top:50px'>Welcome to ${env.PROJECT_NAME} API services!\n<br></h2><h4 style='text-align:center'><button><a href='/api-docs'>Click here for api reference</a></button></h4>`,
    )
  })

  // Set up Swagger UI with request interceptor
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
} else {
  // Prevent Cross-Site Request Forgery
  const csrfProtection = csurf()
  app.use(csrfProtection)
}

app.use('/api/employee', employeeRouter)

export default app
