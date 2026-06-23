import { cn } from '@/lib/utils'

interface TermsCheckboxProps {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function TermsCheckbox({ className, checked, onChange }: TermsCheckboxProps) {
  return (
    <label className={cn('flex items-start gap-2.5 sm:gap-3 cursor-pointer', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-[2px] sm:mt-[3px] w-4 h-4 rounded-[4px] border-neutral-300 text-navy-700 focus:ring-2 focus:ring-navy-600/20 cursor-pointer accent-navy-700 flex-shrink-0"
      />
      <span className="text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] text-neutral-500 leading-relaxed">
        I agree to the{' '}
        <a href="#" className="text-navy-700 font-semibold hover:text-navy-hover underline underline-offset-2">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-navy-700 font-semibold hover:text-navy-hover underline underline-offset-2">
          Privacy Policy
        </a>
      </span>
    </label>
  )
}
