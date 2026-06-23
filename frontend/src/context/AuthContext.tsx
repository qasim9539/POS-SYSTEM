import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authApi, ApiRequestError } from '@/lib/api'
import type { SignInData, SignUpData, User } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: (data: SignUpData) => Promise<void>
  signIn: (data: SignInData) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const response = await authApi.refresh()
      setUser(response.data.user)
      return true
    } catch {
      setUser(null)
      return false
    }
  }, [])

  const initializeAuth = useCallback(async () => {
    try {
      const response = await authApi.getMe()
      setUser(response.data.user)
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 0) {
        setUser(null)
        return
      }

      if (error instanceof ApiRequestError && error.status === 401) {
        const refreshed = await refreshSession()
        if (!refreshed) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [refreshSession])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const signUp = useCallback(async (data: SignUpData) => {
    const response = await authApi.signUp(data)
    setUser(response.data.user)
  }, [])

  const signIn = useCallback(async (data: SignInData) => {
    const response = await authApi.signIn(data)
    setUser(response.data.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signUp,
      signIn,
      logout,
      refreshSession,
    }),
    [user, isLoading, signUp, signIn, logout, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
