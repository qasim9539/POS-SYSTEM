import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group h-full flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100',
        'shadow-sm hover:shadow-card-hover',
        'transition-all duration-300 ease-out',
        className,
      )}
    >
      {/* Icon circle */}
      <div className="w-[60px] h-[60px] rounded-full bg-neutral-100 flex items-center justify-center mb-4">
        <Icon className="w-[28px] h-[28px] text-navy-700" strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-navy-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="flex-1 text-[14px] text-neutral-500 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  )
}
