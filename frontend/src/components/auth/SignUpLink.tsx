import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SignUpLinkProps {
  className?: string
}

export function SignUpLink({ className }: SignUpLinkProps) {
  return (
    <p className={cn('text-center text-[0.875rem] sm:text-[0.9375rem] text-neutral-500', className)}>
      Don&apos;t have an account?{' '}
      <Link
        to="/signup"
        className="font-semibold text-navy-700 hover:text-navy-hover transition-colors"
      >
        Sign up
      </Link>
    </p>
  )
}
