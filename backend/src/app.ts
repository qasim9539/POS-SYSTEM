import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import apiRoutes from './routes/index.js'
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js'

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  )

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many requests. Please try again later.',
      },
    }),
  )

  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: true, limit: '10kb' }))
  app.use(cookieParser())

  if (env.NODE_ENV !== 'test') {
    app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  }

  app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' })
  })

  app.use('/api', apiRoutes)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
