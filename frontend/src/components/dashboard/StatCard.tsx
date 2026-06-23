import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  change: { value: string; positive: boolean }
  icon: React.ReactNode
  iconBg: string
  className?: string
}

export function StatCard({ label, value, change, icon, iconBg, className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 p-5 shadow-sm', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="text-[13px] font-medium text-gray-400">{label}</div>
          <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
          <div className={cn(
            'text-xs font-semibold flex items-center gap-1',
            change.positive ? 'text-emerald-600' : 'text-red-500',
          )}>
            <span className={cn(
              'inline-block w-0 h-0',
              change.positive
                ? 'border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-emerald-500'
                : 'border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-500',
            )} />
            {change.value}
            <span className="text-gray-400 font-normal ml-0.5">vs last month</span>
          </div>
        </div>
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
