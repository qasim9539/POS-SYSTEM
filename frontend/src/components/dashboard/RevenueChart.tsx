import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'

const revenueData = [
  { name: 'Jan', revenue: 18500 },
  { name: 'Feb', revenue: 22500 },
  { name: 'Mar', revenue: 19500 },
  { name: 'Apr', revenue: 26500 },
  { name: 'May', revenue: 21500 },
  { name: 'Jun', revenue: 28500 },
  { name: 'Jul', revenue: 24500 },
  { name: 'Aug', revenue: 30500 },
  { name: 'Sep', revenue: 27500 },
  { name: 'Oct', revenue: 32000 },
  { name: 'Nov', revenue: 29000 },
  { name: 'Dec', revenue: 35000 },
]

interface RevenueChartProps {
  className?: string
}

export function RevenueChart({ className }: RevenueChartProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 p-5 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-gray-900">Monthly Revenue</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">Revenue performance overview</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" />
          <span>Revenue</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: 12,
              }}
              formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, 'Revenue']}
            />
            <Bar
              dataKey="revenue"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
