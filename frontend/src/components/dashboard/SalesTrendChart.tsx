import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'

const weeklyData = [
  { name: 'Mon', sales: 12000 },
  { name: 'Tue', sales: 19000 },
  { name: 'Wed', sales: 15000 },
  { name: 'Thu', sales: 22000 },
  { name: 'Fri', sales: 18000 },
  { name: 'Sat', sales: 25000 },
  { name: 'Sun', sales: 20000 },
]

const monthlyData = [
  { name: 'Jan', sales: 18000 },
  { name: 'Feb', sales: 22000 },
  { name: 'Mar', sales: 19000 },
  { name: 'Apr', sales: 26000 },
  { name: 'May', sales: 21000 },
  { name: 'Jun', sales: 28000 },
]

interface SalesTrendChartProps {
  className?: string
}

export function SalesTrendChart({ className }: SalesTrendChartProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const data = period === 'weekly' ? weeklyData : monthlyData

  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 p-5 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-gray-900">Sales Trend</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">Weekly sales performance</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setPeriod('weekly')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-colors',
              period === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600',
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-colors',
              period === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600',
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
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
              formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, 'Sales']}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
