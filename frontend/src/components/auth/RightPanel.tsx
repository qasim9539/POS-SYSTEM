import { User, Building2, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormHeader } from './FormHeader'
import { GoogleButton } from './GoogleButton'
import { FormDivider } from './FormDivider'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { TermsCheckbox } from './TermsCheckbox'
import { SubmitButton } from './SubmitButton'
import { LoginLink } from './LoginLink'
import { AuthFooter } from './AuthFooter'

interface RightPanelProps {
  className?: string
}

export function RightPanel({ className }: RightPanelProps) {
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

      <form className="space-y-3.5 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          id="fullName"
          type="text"
          placeholder="Full Name"
          icon={<User className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

        <FormField
          id="businessName"
          type="text"
          placeholder="Business Name"
          icon={<Building2 className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

        <FormField
          id="email"
          type="email"
          placeholder="Email Address"
          icon={<Mail className="w-[18px] h-[18px]" strokeWidth={1.75} />}
        />

        <PasswordField
          id="password"
          placeholder="Create Password"
        />

        <PasswordField
          id="confirmPassword"
          placeholder="Confirm Password"
        />

        <TermsCheckbox className="pt-1" />

        <SubmitButton className="mt-0.5" />
      </form>

      <LoginLink className="mt-4 sm:mt-5 md:mt-6" />

      <AuthFooter className="mt-4 sm:mt-5 md:mt-6" />
    </div>
  )
}
