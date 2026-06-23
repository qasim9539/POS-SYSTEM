import type { CookieOptions } from 'express'
import { env } from './env.js'

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export const ACCESS_TOKEN_COOKIE = 'accessToken'
export const REFRESH_TOKEN_COOKIE = 'refreshToken'

function baseCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
  }
}

export function accessTokenCookieOptions(): CookieOptions {
  return {
    ...baseCookieOptions(),
    maxAge: FIFTEEN_MINUTES_MS,
  }
}

export function refreshTokenCookieOptions(): CookieOptions {
  return {
    ...baseCookieOptions(),
    maxAge: SEVEN_DAYS_MS,
  }
}

export function clearCookieOptions(): CookieOptions {
  return baseCookieOptions()
}
