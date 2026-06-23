export type UserRole = 'admin' | 'manager' | 'user'

export interface User {
  id: string
  fullName: string
  businessName: string
  email: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}

export interface MeResponse {
  success: boolean
  data: {
    user: User
  }
}

export interface VerifyResponse {
  success: boolean
  data: {
    authenticated: boolean
    user: User
  }
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: string[]
}

export interface SignUpData {
  fullName: string
  businessName: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignInData {
  email: string
  password: string
}
