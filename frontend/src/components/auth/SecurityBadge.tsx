import { cn } from '@/lib/utils'

interface SecurityBadgeProps {
  className?: string
}

export function SecurityBadge({ className }: SecurityBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1.5 sm:gap-2 text-[0.6875rem] sm:text-[0.75rem] text-white/30', className)}>
      <svg
        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/50 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span className="tracking-wide leading-relaxed">
        Secure JWT Authentication &nbsp;&bull;&nbsp; SOC 2 Compliant &nbsp;&bull;&nbsp; 256-bit SSL
      </span>
    </div>
  )
}
