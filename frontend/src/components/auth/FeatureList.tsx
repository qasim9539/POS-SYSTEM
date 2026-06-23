import { Box, ShoppingCart, BarChart3, Bell, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureItem {
  icon: LucideIcon
  label: string
}

const features: FeatureItem[] = [
  { icon: Box, label: 'Real-time inventory tracking' },
  { icon: ShoppingCart, label: 'Sales & order management' },
  { icon: BarChart3, label: 'Advanced analytics & reports' },
  { icon: Bell, label: 'Smart low-stock alerts' },
]

interface FeatureListProps {
  className?: string
}

export function FeatureList({ className }: FeatureListProps) {
  return (
    <div className={cn('space-y-2 sm:space-y-2.5 md:space-y-3', className)}>
      {features.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-[0.75rem] sm:text-[0.8125rem] md:text-sm text-white/80 font-medium">{label}</span>
        </div>
      ))}
    </div>
  )
}
