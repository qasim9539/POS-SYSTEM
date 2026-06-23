import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface GuestRouteProps {
  children: React.ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-700 border-t-transparent" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
