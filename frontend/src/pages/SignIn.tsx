import { AuthLayout } from '@/components/auth/AuthLayout'
import { LeftPanel } from '@/components/auth/LeftPanel'
import { SignInForm } from '@/components/auth/SignInForm'

export function SignIn() {
  return (
    <AuthLayout>
      <LeftPanel />
      <SignInForm />
    </AuthLayout>
  )
}
