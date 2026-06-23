import type { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { ApiError } from '../utils/ApiError.js'
import { env } from '../config/env.js'

interface ErrorResponse {
  success: false
  message: string
  errors?: string[]
  stack?: string
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`))
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let statusCode = 500
  let message = 'Internal server error'
  let errors: string[] | undefined

  if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errors = err.errors
  } else if (err instanceof ZodError) {
    statusCode = 400
    errors = err.errors.map((e) => e.message)
    message = errors[0] ?? 'Validation failed'
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400
    errors = Object.values(err.errors).map((e) => e.message)
    message = errors[0] ?? 'Validation failed'
  } else if (
    err instanceof Error &&
    'code' in err &&
    (err as { code: number }).code === 11000
  ) {
    statusCode = 409
    message = 'An account with this email already exists'
  }

  const response: ErrorResponse = {
    success: false,
    message,
    ...(errors && { errors }),
    ...(env.NODE_ENV === 'development' && err.stack && { stack: err.stack }),
  }

  if (statusCode >= 500) {
    console.error('[Error]', err)
  }

  res.status(statusCode).json(response)
}
