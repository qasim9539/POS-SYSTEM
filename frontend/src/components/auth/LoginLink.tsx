import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LoginLinkProps {
  className?: string
}

export function LoginLink({ className }: LoginLinkProps) {
  return (
    <p className={cn('text-center text-[0.875rem] sm:text-[0.9375rem] text-neutral-500', className)}>
      Already have an account?{' '}
      <Link
        to="/signin"
        className="font-semibold text-navy-700 hover:text-navy-hover transition-colors"
      >
        Sign in
      </Link>
    </p>
  )
}
