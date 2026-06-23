import { cn } from '@/lib/utils'

interface Sale {
  invoice: string
  customer: string
  product: string
  amount: string
  status: 'Completed' | 'Pending' | 'Cancelled' | 'Processing'
  date: string
}

const sales: Sale[] = [
  { invoice: '#INV-001', customer: 'Alice Johnson', product: 'Wireless Mouse', amount: '$45.00', status: 'Completed', date: '2025-06-15' },
  { invoice: '#INV-002', customer: 'Bob Smith', product: 'USB-C Hub', amount: '$89.00', status: 'Pending', date: '2025-06-14' },
  { invoice: '#INV-003', customer: 'Carol White', product: 'Mechanical Keyboard', amount: '$150.00', status: 'Completed', date: '2025-06-14' },
  { invoice: '#INV-004', customer: 'David Lee', product: '27" Monitor', amount: '$350.00', status: 'Processing', date: '2025-06-13' },
  { invoice: '#INV-005', customer: 'Eve Brown', product: 'Webcam HD', amount: '$79.99', status: 'Completed', date: '2025-06-13' },
]

const statusStyles: Record<string, string> = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
  Processing: 'bg-blue-50 text-blue-700 border-blue-200',
}

interface RecentSalesTableProps {
  className?: string
}

export function RecentSalesTable({ className }: RecentSalesTableProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Recent Sales</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">Latest transactions this month</p>
        </div>
        <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-gray-100">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Invoice</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr
                key={sale.invoice}
                className={cn(
                  'border-b border-gray-50 transition-colors hover:bg-gray-50/50',
                  index === sales.length - 1 && 'border-b-0',
                )}
              >
                <td className="px-5 py-3.5 text-[13px] font-semibold text-blue-600">{sale.invoice}</td>
                <td className="px-5 py-3.5 text-[13px] text-gray-700">{sale.customer}</td>
                <td className="px-5 py-3.5 text-[13px] text-gray-600">{sale.product}</td>
                <td className="px-5 py-3.5 text-[13px] font-semibold text-gray-800">{sale.amount}</td>
                <td className="px-5 py-3.5">
                  <span className={cn(
                    'inline-block px-2 py-0.5 rounded text-[11px] font-semibold border',
                    statusStyles[sale.status],
                  )}>
                    {sale.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[13px] text-gray-400">{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
