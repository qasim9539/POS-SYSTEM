import { useState, useEffect } from 'react'
import Header from '../../components/Header.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import StatCard from '../../components/StatCard.jsx'
import SalesTrendChart from '../../components/SalesTrendChart.jsx'
import RevenueAnalytics from '../../components/RevenueAnalytics.jsx'
import RecentSalesTable from '../../components/RecentSalesTable.jsx'
import TopSellingProducts from '../../components/TopSellingProducts.jsx'
import RecentInvoices from '../../components/RecentInvoices.jsx'
import { salesService } from './services/salesService.js'

export default function SalesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSales = async () => {
    try {
      setLoading(true)
      const data = await salesService.getAllSales()
      setSales(data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch sales')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSales()
  }, [])

  const handleSaleCreated = () => {
    fetchSales()
  }

  const handleSaleDeleted = () => {
    fetchSales()
  }

  const stats = [
    {
      id: 1,
      title: 'Total Sales',
      value: `$${sales.reduce((acc, sale) => acc + (sale.totalAmount || 0), 0).toLocaleString()}`,
      growth: '+0%',
      isPositive: true,
      icon: '🛒',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      label: 'vs last month'
    },
    {
      id: 2,
      title: "Today's Revenue",
      value: `$${sales.filter(sale => {
        const today = new Date().toDateString();
        return new Date(sale.createdAt).toDateString() === today;
      }).reduce((acc, sale) => acc + (sale.totalAmount || 0), 0).toLocaleString()}`,
      growth: '+0%',
      isPositive: true,
      icon: '💲',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      label: 'vs yesterday'
    },
    {
      id: 3,
      title: 'Monthly Revenue',
      value: `$${sales.filter(sale => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const saleDate = new Date(sale.createdAt);
        return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
      }).reduce((acc, sale) => acc + (sale.totalAmount || 0), 0).toLocaleString()}`,
      growth: '+0%',
      isPositive: true,
      icon: '📈',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      label: 'vs previous month'
    },
    {
      id: 4,
      title: 'Total Orders',
      value: sales.length.toString(),
      growth: '+0%',
      isPositive: true,
      icon: '📦',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      label: 'vs last month'
    },
    {
      id: 5,
      title: 'Average Order Value',
      value: sales.length > 0 
        ? `$${(sales.reduce((acc, sale) => acc + (sale.totalAmount || 0), 0) / sales.length).toFixed(2)}` 
        : '$0',
      growth: '-0%',
      isPositive: false,
      icon: '🧾',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      label: 'vs last month'
    }
  ]

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-50`}>
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} active="sales" />
      </div>
      
      {/* Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <Header
          title="Sales Management"
          breadcrumb="Sales"
          onToggleSidebar={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                growth={stat.growth}
                isPositive={stat.isPositive}
                icon={stat.icon}
                bgColor={stat.bgColor}
                iconColor={stat.iconColor}
                label={stat.label}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            <SalesTrendChart sales={sales} />
            <RevenueAnalytics sales={sales} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RecentSalesTable sales={sales} loading={loading} onDelete={handleSaleDeleted} />
            </div>
            <div className="space-y-4">
              <TopSellingProducts sales={sales} />
              <RecentInvoices sales={sales} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
