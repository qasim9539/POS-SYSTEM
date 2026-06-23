import { type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
}

export function FormField({ icon, className, ...props }: FormFieldProps) {
  return (
    <div className="relative">
      <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
        {icon}
      </div>
      <input
        className={cn(
          'w-full pl-10 sm:pl-11 pr-3.5 sm:pr-4 py-3 sm:py-3.5',
          'rounded-xl border border-neutral-200',
          'bg-white text-navy-900 placeholder:text-neutral-400',
          'text-sm sm:text-[0.9375rem]',
          'focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10',
          'outline-none transition-all duration-200',
          className,
        )}
        {...props}
      />
    </div>
  )
}
