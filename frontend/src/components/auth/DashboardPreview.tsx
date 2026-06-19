import { cn } from '@/lib/utils'

interface DashboardPreviewProps {
  className?: string
}

export function DashboardPreview({ className }: DashboardPreviewProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[420px] lg:max-w-none mx-auto',
        'rounded-xl sm:rounded-2xl',
        'p-3.5 sm:p-4 md:p-5',
        'bg-white/[0.06] backdrop-blur-xl',
        'border border-white/[0.08]',
        'shadow-lg shadow-black/20',
        className,
      )}
    >
      {/* Browser header dots */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27CA40]" />
      </div>

      {/* Dashboard metrics */}
      <div className="space-y-3 sm:space-y-3.5">
        {/* Revenue */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[0.625rem] sm:text-[0.6875rem] text-white/30 font-semibold uppercase tracking-[0.12em]">
              Revenue
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-white mt-0.5">$48,295</div>
          </div>
          <div className="flex items-end gap-[2px] sm:gap-[3px] h-7 sm:h-8 md:h-10 min-w-0 flex-1 justify-end">
            {[40, 55, 35, 65, 50, 42, 70, 55, 80, 60, 75, 85].map((h, i) => (
              <div
                key={i}
                className="w-[2px] sm:w-[3px] rounded-t-[2px] bg-gradient-to-t from-emerald-500/60 to-emerald-400 flex-shrink-0"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06]" />

        {/* Orders */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[0.625rem] sm:text-[0.6875rem] text-white/30 font-semibold uppercase tracking-[0.12em]">
              Orders
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-white mt-0.5">1,247</div>
          </div>
          <div className="flex items-end gap-[2px] sm:gap-[3px] h-7 sm:h-8 md:h-10 min-w-0 flex-1 justify-end">
            {[50, 35, 60, 40, 55, 70, 45, 65, 50, 75, 55, 60].map((h, i) => (
              <div
                key={i}
                className="w-[2px] sm:w-[3px] rounded-t-[2px] bg-gradient-to-t from-blue-500/60 to-blue-400 flex-shrink-0"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06]" />

        {/* Stock */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[0.625rem] sm:text-[0.6875rem] text-white/30 font-semibold uppercase tracking-[0.12em]">
              Stock
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-white mt-0.5">8,392</div>
          </div>
          <div className="flex items-end gap-[2px] sm:gap-[3px] h-7 sm:h-8 md:h-10 min-w-0 flex-1 justify-end">
            {[65, 40, 55, 70, 45, 60, 75, 50, 65, 80, 55, 70].map((h, i) => (
              <div
                key={i}
                className="w-[2px] sm:w-[3px] rounded-t-[2px] bg-gradient-to-t from-violet-500/60 to-violet-400 flex-shrink-0"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
