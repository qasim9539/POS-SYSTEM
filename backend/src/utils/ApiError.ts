export class ApiError extends Error {
  readonly statusCode: number
  readonly isOperational: boolean
  readonly errors?: string[]

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.errors = errors
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
