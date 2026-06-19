import { type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubmitButtonProps {
  className?: string
  children?: ReactNode
}

export function SubmitButton({ className, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        'w-full flex items-center justify-center gap-2 sm:gap-2.5',
        'px-5 sm:px-6 py-3 sm:py-3.5',
        'bg-navy-800 text-white',
        'rounded-xl',
        'text-sm sm:text-[0.9375rem] font-semibold',
        'shadow-sm shadow-navy-800/10',
        'hover:bg-navy-hover hover:shadow-md hover:shadow-navy-800/15',
        'active:scale-[0.99]',
        'transition-all duration-200',
        'cursor-pointer',
        className,
      )}
    >
      {children || (
        <>
          Create Account
          <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2.5} />
        </>
      )}
    </button>
  )
}
