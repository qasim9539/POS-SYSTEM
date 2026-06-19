import { cn } from '@/lib/utils'

interface FormHeaderProps {
  className?: string
}

export function FormHeader({ className }: FormHeaderProps) {
  return (
    <div className={cn('space-y-2.5 sm:space-y-3', className)}>
      {/* Small logo + brand */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-navy-800 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <span className="text-base sm:text-lg font-bold text-navy-800 tracking-tight">InvenFlow</span>
      </div>

      <h1 className="text-xl sm:text-[1.625rem] md:text-[1.75rem] lg:text-[2rem] font-bold text-navy-900 tracking-tight pt-2.5 sm:pt-3">
        Create your account
      </h1>
      <p className="text-xs sm:text-sm md:text-[0.9375rem] text-neutral-500 leading-relaxed">
        Start managing smarter &mdash; free for 14 days, no credit card required.
      </p>
    </div>
  )
}
