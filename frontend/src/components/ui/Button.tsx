import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<string, string> = {
  primary: 'bg-navy-800 text-white hover:bg-navy-hover shadow-sm shadow-navy-800/10',
  secondary: 'bg-neutral-100 text-navy-800 hover:bg-neutral-200',
  outline: 'border border-navy-700/20 text-navy-800 hover:bg-navy-50 hover:border-navy-700/40',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700/30 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        'cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
}
