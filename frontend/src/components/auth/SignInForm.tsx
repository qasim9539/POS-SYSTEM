import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { ApiRequestError } from '@/lib/api'
import { GoogleButton } from './GoogleButton'
import { FormDivider } from './FormDivider'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { SubmitButton } from './SubmitButton'
import { SignUpLink } from './SignUpLink'
import { AuthFooter } from './AuthFooter'
import { AuthError } from './AuthError'

interface SignInFormProps {
  className?: string
}

export function SignInForm({ className }: SignInFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signIn({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message)
      } else {
        setError('Unable to sign in. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        'w-full',
        'px-6 sm:px-10 md:px-12 lg:px-14 xl:px-16',
        'py-8 sm:py-9 md:py-10',
        'lg:w-[54%] lg:justify-center lg:overflow-y-auto',
        className,
      )}
    >
      <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 md:mb-7">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-navy-800 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold text-navy-800 tracking-tight">InvenFlow</span>
        </div>

        <h1 className="text-xl sm:text-[1.625rem] md:text-[1.75rem] lg:text-[2rem] font-bold text-navy-900 tracking-tight pt-2">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm md:text-[0.9375rem] text-neutral-500 leading-relaxed">
          Sign in to your account to continue managing your inventory.
        </p>
      </div>

      <GoogleButton className="mb-4 sm:mb-5" />

      <FormDivider className="mb-4 sm:mb-5 md:mb-6" />

      <AuthError message={error} className="mb-4" />

      <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
        <FormField
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          required
          disabled={isSubmitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

        <PasswordField
          id="password"
          name="password"
          placeholder="Enter Password"
          autoComplete="current-password"
          required
          disabled={isSubmitting}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <a href="#" className="text-xs sm:text-sm font-medium text-navy-700 hover:text-navy-hover transition-colors">
            Forgot password?
          </a>
        </div>

        <SubmitButton isLoading={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
          {!isSubmitting && (
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          )}
        </SubmitButton>
      </form>

      <SignUpLink className="mt-4 sm:mt-5 md:mt-6" />

      <AuthFooter className="mt-4 sm:mt-5 md:mt-6" />
    </div>
  )
}
