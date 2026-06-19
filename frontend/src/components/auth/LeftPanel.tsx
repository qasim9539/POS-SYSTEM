import { cn } from '@/lib/utils'
import { BrandArea } from './BrandArea'
import { HeroHeading } from './HeroHeading'
import { FeatureList } from './FeatureList'
import { StatsSection } from './StatsSection'
import { DashboardPreview } from './DashboardPreview'
import { SecurityBadge } from './SecurityBadge'

interface LeftPanelProps {
  className?: string
}

export function LeftPanel({ className }: LeftPanelProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col',
        'bg-[#071B4D]',
        'px-6 sm:px-8 md:px-10 lg:px-12',
        'py-8 sm:py-10 lg:py-10',
        'lg:h-full lg:w-[46%]',
        'overflow-hidden',
        className,
      )}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-60 lg:h-80 bg-gradient-to-t from-[#05163D]/70 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 lg:flex-1 lg:justify-center">
        <BrandArea />
        <HeroHeading />
        <FeatureList />
        <StatsSection />
      </div>

      <div className="relative z-10 pt-5 sm:pt-6 lg:pt-5 space-y-4 sm:space-y-5">
        <DashboardPreview />
        <SecurityBadge />
      </div>
    </div>
  )
}
