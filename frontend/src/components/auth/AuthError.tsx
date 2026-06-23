import { cn } from '@/lib/utils'

interface AuthErrorProps {
  message?: string
  className?: string
}

export function AuthError({ message, className }: AuthErrorProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
        className,
      )}
      role="alert"
    >
      {message}
    </div>
  )
}
