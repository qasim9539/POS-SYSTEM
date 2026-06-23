import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

const ACCESS_TOKEN_EXPIRY = '15m'
const REFRESH_TOKEN_EXPIRY = '7d'
const REFRESH_TOKEN_SALT_ROUNDS = 12

export interface TokenPayload {
  sub: string
  type: 'access' | 'refresh'
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ sub: userId, type: 'access' }, env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  })
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload

    if (payload.type !== 'access') {
      throw new ApiError(401, 'Invalid access token')
    }

    return payload
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(401, 'Access token expired or invalid')
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload

    if (payload.type !== 'refresh') {
      throw new ApiError(401, 'Invalid refresh token')
    }

    return payload
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(401, 'Refresh token expired or invalid')
  }
}

export async function hashRefreshToken(token: string): Promise<string> {
  return bcrypt.hash(token, REFRESH_TOKEN_SALT_ROUNDS)
}

export async function compareRefreshToken(
  token: string,
  hashedToken: string,
): Promise<boolean> {
  return bcrypt.compare(token, hashedToken)
}
