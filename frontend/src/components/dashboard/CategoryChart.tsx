import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

const categoryData = [
  { name: 'Electronics', value: 35, color: '#2563EB' },
  { name: 'Clothing', value: 25, color: '#8B5CF6' },
  { name: 'Food & Bev', value: 20, color: '#F59E0B' },
  { name: 'Health', value: 12, color: '#10B981' },
  { name: 'Others', value: 8, color: '#6B7280' },
]

const total = categoryData.reduce((acc, curr) => acc + curr.value, 0)

interface CategoryChartProps {
  className?: string
}

export function CategoryChart({ className }: CategoryChartProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 p-5 shadow-sm', className)}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">Product Category</h3>
        <p className="text-[12px] text-gray-400 mt-0.5">Distribution by category</p>
      </div>

      {/* Chart layout */}
      <div className="flex items-center gap-4">
        {/* Donut chart */}
        <div className="w-[140px] h-[140px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={62}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryData[index].color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text overlay */}
          <div className="relative -mt-[140px] h-[140px] flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-gray-900">{total}%</span>
            <span className="text-[10px] text-gray-400 font-medium">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] text-gray-600">{item.name}</span>
              </div>
              <span className="text-[12px] font-semibold text-gray-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
