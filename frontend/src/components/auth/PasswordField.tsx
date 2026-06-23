import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id?: string
  placeholder?: string
  className?: string
}

export function PasswordField({ id, placeholder = '••••••••', className, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
        <svg
          className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 sm:pl-11 pr-11 sm:pr-12 py-3 sm:py-3.5',
          'rounded-xl border border-neutral-200',
          'bg-white text-navy-900 placeholder:text-neutral-400',
          'text-sm sm:text-[0.9375rem]',
          'focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10',
          'outline-none transition-all duration-200',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
        tabIndex={-1}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <EyeOff className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.75} />
        ) : (
          <Eye className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.75} />
        )}
      </button>
    </div>
  )
}
