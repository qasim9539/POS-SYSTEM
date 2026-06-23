import bcrypt from 'bcryptjs'
import { User, toSafeUser, type SafeUser } from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  compareRefreshToken,
  verifyRefreshToken,
} from './token.service.js'
import type { SignUpInput, SignInInput } from '../validators/auth.validator.js'

const PASSWORD_SALT_ROUNDS = 12

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResult {
  user: SafeUser
  tokens: AuthTokens
}

async function issueTokens(userId: string): Promise<AuthTokens> {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken(userId)
  const hashedRefreshToken = await hashRefreshToken(refreshToken)

  await User.findByIdAndUpdate(userId, { refreshToken: hashedRefreshToken })

  return { accessToken, refreshToken }
}

export async function signUp(input: SignUpInput): Promise<AuthResult> {
  const existingUser = await User.findOne({ email: input.email })

  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS)

  const user = await User.create({
    fullName: input.fullName,
    businessName: input.businessName,
    email: input.email,
    password: hashedPassword,
    role: 'admin',
    isVerified: false,
    isActive: true,
  })

  const tokens = await issueTokens(user._id.toString())

  return {
    user: toSafeUser(user),
    tokens,
  }
}

export async function signIn(input: SignInInput): Promise<AuthResult> {
  const user = await User.findOne({ email: input.email }).select('+password')

  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Please contact support.')
  }

  const isPasswordValid = await user.comparePassword(input.password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password')
  }

  user.lastLogin = new Date()
  await user.save()

  const tokens = await issueTokens(user._id.toString())

  return {
    user: toSafeUser(user),
    tokens,
  }
}

export async function logout(userId: string): Promise<void> {
  await User.findByIdAndUpdate(userId, { refreshToken: null })
}

export async function refreshSession(refreshToken: string): Promise<AuthResult> {
  const payload = verifyRefreshToken(refreshToken)

  const user = await User.findById(payload.sub).select('+refreshToken')

  if (!user || !user.refreshToken) {
    throw new ApiError(401, 'Session expired. Please sign in again.')
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Please contact support.')
  }

  const isTokenValid = await compareRefreshToken(refreshToken, user.refreshToken)

  if (!isTokenValid) {
    await User.findByIdAndUpdate(user._id, { refreshToken: null })
    throw new ApiError(401, 'Session expired. Please sign in again.')
  }

  const tokens = await issueTokens(user._id.toString())

  return {
    user: toSafeUser(user),
    tokens,
  }
}

export async function getUserById(userId: string): Promise<SafeUser> {
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Please contact support.')
  }

  return toSafeUser(user)
}
