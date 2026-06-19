import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'min-h-screen',
        'bg-neutral-100',
        'p-0 sm:p-4 lg:p-6 xl:p-8',
      )}
    >
      <div
        className={cn(
          'flex flex-col',
          'w-full',
          'sm:max-w-[640px] sm:rounded-2xl',
          'md:max-w-[720px]',
          'lg:max-w-[1280px] lg:flex-row lg:h-[92vh] lg:rounded-[1.75rem]',
          'xl:max-w-[1400px]',
          'bg-white',
          'border-0 sm:border border-neutral-200/80',
          'shadow-none sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]',
          'overflow-hidden',
        )}
      >
        {children}
      </div>
    </div>
  )
}
