import { cn } from '@/lib/utils'

interface StatsSectionProps {
  className?: string
}

const stats = [
  { value: '12,400+', label: 'Products tracked' },
  { value: '$2.3M', label: 'Sales processed' },
  { value: '98.6%', label: 'Accuracy rate' },
]

export function StatsSection({ className }: StatsSectionProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          <div className="text-center px-2.5 sm:px-3 md:px-5">
            <div className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
              {stat.value}
            </div>
            <div className="text-[0.625rem] sm:text-[0.6875rem] md:text-[0.75rem] text-white/40 font-semibold mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
          {index < stats.length - 1 && (
            <div className="w-px h-6 sm:h-8 md:h-10 bg-white/[0.10]" />
          )}
        </div>
      ))}
    </div>
  )
}
