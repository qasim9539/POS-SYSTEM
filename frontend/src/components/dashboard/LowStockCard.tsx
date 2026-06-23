import { AlertTriangle, Box, ShoppingCart, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LowStockItem {
  product: string
  category: string
  current: number
  threshold: number
  icon: React.ReactNode
  iconBg: string
}

const lowStockItems: LowStockItem[] = [
  { product: 'Wireless Mouse', category: 'Electronics', current: 8, threshold: 20, icon: <Box size={16} />, iconBg: 'bg-red-50 text-red-500' },
  { product: 'USB-C Cables', category: 'Accessories', current: 5, threshold: 30, icon: <ShoppingCart size={16} />, iconBg: 'bg-red-50 text-red-500' },
  { product: 'Laptop Stands', category: 'Office', current: 3, threshold: 15, icon: <TrendingDown size={16} />, iconBg: 'bg-red-50 text-red-500' },
]

interface LowStockCardProps {
  className?: string
}

export function LowStockCard({ className }: LowStockCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Low Stock Alerts</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">Items need reordering</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white bg-red-500">
          {lowStockItems.length}
        </span>
      </div>

      {/* List */}
      <div className="px-5 pb-5 space-y-3.5">
        {lowStockItems.map((item) => {
          const percent = Math.round((item.current / item.threshold) * 100)
          return (
            <div key={item.product}>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', item.iconBg)}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-800">{item.product}</span>
                    <span className="text-[12px] font-bold text-red-500">{item.current}/{item.threshold}</span>
                  </div>
                  <div className="text-[11px] text-gray-400">{item.category}</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}

        {/* View all */}
        <a href="#" className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 pt-2 transition-colors">
          View All Alerts
        </a>
      </div>
    </div>
  )
}
