import type { Response } from 'express'
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  clearCookieOptions,
} from '../config/cookies.js'
import * as authService from '../services/auth.service.js'
import { toSafeUser } from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

function setAuthCookies(res: Response, tokens: authService.AuthTokens): void {
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, accessTokenCookieOptions())
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenCookieOptions())
}

function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_TOKEN_COOKIE, clearCookieOptions())
  res.clearCookie(REFRESH_TOKEN_COOKIE, clearCookieOptions())
}

export const signUp = asyncHandler(async (req, res) => {
  const result = await authService.signUp(req.body)

  setAuthCookies(res, result.tokens)

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: { user: result.user },
  })
})

export const signIn = asyncHandler(async (req, res) => {
  const result = await authService.signIn(req.body)

  setAuthCookies(res, result.tokens)

  res.status(200).json({
    success: true,
    message: 'Signed in successfully',
    data: { user: result.user },
  })
})

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await authService.logout(req.user._id.toString())
  }

  clearAuthCookies(res)

  res.status(200).json({
    success: true,
    message: 'Signed out successfully',
  })
})

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE]

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token missing')
  }

  const result = await authService.refreshSession(refreshToken)

  setAuthCookies(res, result.tokens)

  res.status(200).json({
    success: true,
    message: 'Session refreshed successfully',
    data: { user: result.user },
  })
})

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required')
  }

  res.status(200).json({
    success: true,
    data: { user: toSafeUser(req.user) },
  })
})

export const verify = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authenticated')
  }

  res.status(200).json({
    success: true,
    data: { authenticated: true, user: toSafeUser(req.user) },
  })
})
