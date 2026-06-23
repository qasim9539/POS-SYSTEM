import { cn } from '@/lib/utils'

interface HeroHeadingProps {
  className?: string
}

export function HeroHeading({ className }: HeroHeadingProps) {
  return (
    <div className={cn('space-y-2.5 sm:space-y-3 md:space-y-4', className)}>
      <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-extrabold text-white leading-[1.12] tracking-tight">
        Manage Inventory
        <br />
        &amp; Sales Smarter
      </h1>
      <p className="text-xs sm:text-sm md:text-[0.9375rem] text-white/60 leading-relaxed max-w-md">
        One platform for inventory tracking, sales management, analytics, and reporting
        &mdash; built for modern businesses.
      </p>
    </div>
  )
}
