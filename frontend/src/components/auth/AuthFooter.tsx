import { cn } from '@/lib/utils'

interface AuthFooterProps {
  className?: string
}

export function AuthFooter({ className }: AuthFooterProps) {
  return (
    <div className={cn('text-center space-y-2.5 sm:space-y-3', className)}>
      <div className="flex items-center justify-center gap-1.5 text-[0.6875rem] sm:text-[0.75rem] text-neutral-400">
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="leading-relaxed">
          Secure JWT Authentication &nbsp;&bull;&nbsp; 256-bit SSL Encryption
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[0.6875rem] sm:text-[0.75rem] text-neutral-400">
        <span>&copy; 2025 InvenFlow, Inc.</span>
        <a href="#" className="hover:text-neutral-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-neutral-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-neutral-600 transition-colors">Support</a>
      </div>
    </div>
  )
}
