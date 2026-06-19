import { cn } from '@/lib/utils'

interface BrandAreaProps {
  className?: string
}

export function BrandArea({ className }: BrandAreaProps) {
  return (
    <div className={cn('flex items-center gap-2.5 sm:gap-3', className)}>
      {/* Logo icon */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center">
        <svg
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white"
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
      <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight">
        InvenFlow
      </span>
    </div>
  )
}
