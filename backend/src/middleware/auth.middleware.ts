import { User } from '../models/User.js'
import { verifyAccessToken } from '../services/token.service.js'
import { ACCESS_TOKEN_COOKIE } from '../config/cookies.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const authenticate = asyncHandler(async (req, _res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE]

  if (!accessToken) {
    throw new ApiError(401, 'Authentication required')
  }

  const payload = verifyAccessToken(accessToken)

  const user = await User.findById(payload.sub)

  if (!user) {
    throw new ApiError(401, 'User not found')
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated')
  }

  req.user = user
  next()
})

export const optionalAuthenticate = asyncHandler(async (req, _res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE]

  if (!accessToken) {
    next()
    return
  }

  try {
    const payload = verifyAccessToken(accessToken)
    const user = await User.findById(payload.sub)

    if (user?.isActive) {
      req.user = user
    }
  } catch {
    // Token invalid or expired — continue without user
  }

  next()
})
