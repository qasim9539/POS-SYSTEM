import type {
  ApiErrorResponse,
  AuthResponse,
  MeResponse,
  SignInData,
  SignUpData,
  VerifyResponse,
} from '@/types/auth'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export class ApiRequestError extends Error {
  readonly status: number
  readonly errors?: string[]

  constructor(status: number, message: string, errors?: string[]) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.errors = errors
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch {
    throw new ApiRequestError(
      0,
      'Cannot reach the server. Make sure the backend is running on port 5000.',
    )
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = data as ApiErrorResponse | null
    throw new ApiRequestError(
      response.status,
      error?.message ?? 'An unexpected error occurred',
      error?.errors,
    )
  }

  return data as T
}

export const authApi = {
  signUp(data: SignUpData) {
    return request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  signIn(data: SignInData) {
    return request<AuthResponse>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  logout() {
    return request<{ success: boolean; message: string }>('/api/auth/logout', {
      method: 'POST',
    })
  },

  refresh() {
    return request<AuthResponse>('/api/auth/refresh', {
      method: 'POST',
    })
  },

  getMe() {
    return request<MeResponse>('/api/auth/me')
  },

  verify() {
    return request<VerifyResponse>('/api/auth/verify')
  },
}
