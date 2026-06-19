import { cn } from '@/lib/utils'

interface FormDividerProps {
  className?: string
}

export function FormDivider({ className }: FormDividerProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex-1 h-px bg-neutral-200" />
      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em]">Or</span>
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  )
}
