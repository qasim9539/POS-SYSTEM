import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Building2, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { ApiRequestError } from '@/lib/api'
import { FormHeader } from './FormHeader'
import { GoogleButton } from './GoogleButton'
import { FormDivider } from './FormDivider'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { TermsCheckbox } from './TermsCheckbox'
import { SubmitButton } from './SubmitButton'
import { LoginLink } from './LoginLink'
import { AuthFooter } from './AuthFooter'
import { AuthError } from './AuthError'

interface RightPanelProps {
  className?: string
}

export function RightPanel({ className }: RightPanelProps) {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!acceptedTerms) {
      setError('You must accept the Terms of Service and Privacy Policy')
      return
    }

    setIsSubmitting(true)

    try {
      await signUp({ fullName, businessName, email, password, confirmPassword })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message)
      } else {
        setError('Unable to create account. Please check your connection and try again.')
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
      <FormHeader className="mb-5 sm:mb-6 md:mb-7" />

      <GoogleButton className="mb-4 sm:mb-5" />

      <FormDivider className="mb-4 sm:mb-5 md:mb-6" />

      <AuthError message={error} className="mb-4" />

      <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
        <FormField
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          required
          disabled={isSubmitting}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          icon={<User className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

        <FormField
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Business Name"
          autoComplete="organization"
          required
          disabled={isSubmitting}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          icon={<Building2 className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

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
          placeholder="Create Password"
          autoComplete="new-password"
          required
          disabled={isSubmitting}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          required
          disabled={isSubmitting}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <TermsCheckbox
          className="pt-1"
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
        />

        <SubmitButton className="mt-0.5" isLoading={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </SubmitButton>
      </form>

      <LoginLink className="mt-4 sm:mt-5 md:mt-6" />

      <AuthFooter className="mt-4 sm:mt-5 md:mt-6" />
    </div>
  )
}
