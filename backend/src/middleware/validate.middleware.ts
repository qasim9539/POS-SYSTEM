import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodSchema } from 'zod'
import { ApiError } from '../utils/ApiError.js'

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((err) => err.message)
        next(new ApiError(400, messages[0] ?? 'Validation failed', messages))
        return
      }
      next(error)
    }
  }
}
