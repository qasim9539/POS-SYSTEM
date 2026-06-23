import { StatCard } from '@/components/dashboard/StatCard'
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { RecentSalesTable } from '@/components/dashboard/RecentSalesTable'
import { LowStockCard } from '@/components/dashboard/LowStockCard'
import { Package, Warehouse, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react'

export function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
        <StatCard
          label="Total Products"
          value="12,847"
          change={{ value: '12.5%', positive: true }}
          icon={<Package size={18} className="text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          label="In Stock Units"
          value="48,392"
          change={{ value: '8.2%', positive: true }}
          icon={<Warehouse size={18} className="text-emerald-600" />}
          iconBg="bg-emerald-50"
        />
        <StatCard
          label="Total Sales"
          value="$284,500"
          change={{ value: '15.3%', positive: true }}
          icon={<ShoppingCart size={18} className="text-purple-600" />}
          iconBg="bg-purple-50"
        />
        <StatCard
          label="Revenue"
          value="$1.2M"
          change={{ value: '22.8%', positive: true }}
          icon={<DollarSign size={18} className="text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Low Stock Items"
          value="23"
          change={{ value: '5.7%', positive: false }}
          icon={<AlertTriangle size={18} className="text-red-600" />}
          iconBg="bg-red-50"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <SalesTrendChart />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <RecentSalesTable />
        </div>
        <div>
          <div className="space-y-5">
            <CategoryChart />
            <LowStockCard />
          </div>
        </div>
      </div>
    </>
  )
}
