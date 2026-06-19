import { AuthLayout } from '@/components/auth/AuthLayout'
import { LeftPanel } from '@/components/auth/LeftPanel'
import { RightPanel } from '@/components/auth/RightPanel'

export function SignUp() {
  return (
    <AuthLayout>
      <LeftPanel />
      <RightPanel />
    </AuthLayout>
  )
}
