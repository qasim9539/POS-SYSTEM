import { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Plus,
  Minus,
  ChevronDown,
  Box,
  Layers,
  Lock,
  AlertCircle,
  Activity,
  Target,
} from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Header from '../../components/Header.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { analyticsService } from '../../features/analytics/services/analyticsService.js';
import { productsService } from '../../features/products/services/productsService.js';
import { salesService } from '../../features/sales/services/salesService.js';
import {
  stats as defaultStats,
  salesPerformanceData as defaultSalesPerformanceData,
  monthlyRevenueData as defaultMonthlyRevenueData,
  salesByCategoryData as defaultSalesByCategoryData,
  generatedReports,
  bestSellingProducts as defaultBestSellingProducts,
  inventoryReports as defaultInventoryReports,
} from './reportsData.js';

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [salesChartData, setSalesChartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summary, chartData, productList, saleList] = await Promise.all([
        analyticsService.getSummary(),
        analyticsService.getSalesChart(),
        productsService.getAllProducts(),
        salesService.getAllSales(),
      ]);
      setSummaryData(summary);
      setSalesChartData(chartData);
      setProducts(productList);
      setSales(saleList);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Process sales performance data (monthly)
  const salesPerformanceData = (() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const data = months.map(month => {
      const monthSales = sales.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        return saleDate.getFullYear() === currentYear && 
               saleDate.getMonth() === months.indexOf(month);
      });
      return {
        month,
        sales: monthSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0),
      };
    });
    return data.length > 0 ? data : defaultSalesPerformanceData;
  })();

  // Process monthly revenue data (same as sales performance)
  const monthlyRevenueData = salesPerformanceData;

  // Process sales by category
  const salesByCategoryData = (() => {
    if (products.length === 0) return defaultSalesByCategoryData;
    const categoryData = {};
    sales.forEach(sale => {
      sale.items?.forEach(item => {
        const product = products.find(p => p._id === item.product);
        if (product) {
          const category = product.category || 'Other';
          categoryData[category] = (categoryData[category] || 0) + (item.quantity * item.price);
        }
      });
    });
    const colors = ['#1E40AF', '#061B5A', '#2563EB', '#3B82F6', '#93C5FD'];
    const total = Object.values(categoryData).reduce((sum, v) => sum + v, 0);
    return Object.entries(categoryData).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  })();

  // Process best selling products
  const bestSellingProducts = (() => {
    if (products.length === 0) return defaultBestSellingProducts;
    const productSales = {};
    sales.forEach(sale => {
      sale.items?.forEach(item => {
        const product = products.find(p => p._id === item.product);
        if (product) {
          if (!productSales[product._id]) {
            productSales[product._id] = {
              name: product.name,
              sku: product.sku,
              unitsSold: 0,
              revenue: 0,
              growth: '+0%',
            };
          }
          productSales[product._id].unitsSold += item.quantity;
          productSales[product._id].revenue += item.quantity * item.price;
        }
      });
    });
    const sortedProducts = Object.values(productSales).sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5);
    return sortedProducts.length > 0 ? sortedProducts : defaultBestSellingProducts;
  })();

  // Process inventory reports
  const inventoryReports = (() => {
    const lowStockCount = products.filter(p => p.stockQuantity <= (p.lowStockThreshold || 5)).length;
    return [
      { name: 'Total Products', value: products.length.toString(), button: true },
      { name: 'In Stock', value: (products.length - lowStockCount).toString(), growth: '+12%' },
      { name: 'Low Stock', value: lowStockCount.toString(), growth: '-5%' },
      { name: 'Out of Stock', value: '0', button: true },
      { name: 'Total Value', value: products.reduce((sum, p) => sum + (p.stockQuantity * (p.sellingPrice || 0)), 0).toLocaleString(), growth: '+8%' },
    ];
  })();

  const stats = (() => {
    if (!summaryData) return defaultStats;
    return [
      { id: 1, icon: Box, title: 'Total SKUs', value: summaryData.totalProducts?.toString() || '0', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
      { id: 2, icon: Layers, title: 'Total Sales', value: summaryData.totalSales?.toString() || '0', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
      { id: 3, icon: Activity, title: 'Total Revenue', value: `$${(summaryData.totalRevenue || 0).toLocaleString()}`, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
      { id: 4, icon: AlertCircle, title: 'Low Stock', value: summaryData.lowStockCount?.toString() || '0', bgColor: 'bg-red-50', iconColor: 'text-red-600' },
    ];
  })();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
            Completed
          </span>
        );
      case 'Processing':
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold">
            Processing
          </span>
        );
      case 'Scheduled':
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
            Scheduled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  const getProgressColor = (status) => {
    if (status === 'In Stock') return 'bg-green-500';
    if (status === 'Low Stock') return 'bg-orange-500';
    return 'bg-red-500';
  };

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
      <div className={`${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 transition-transform duration-300 z-50'}`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          active="reports"
        />
      </div>

      {/* Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <Header
          title="Reports & Analytics"
          breadcrumb="Reports"
          onToggleSidebar={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-6 w-full">
            {/* Main Content Area */}
            <div className="flex-1 w-full">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                {loading ? (
                  [1,2,3,4].map(i => (
                    <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                        <div className="min-w-0 flex-1">
                          <div className="h-8 bg-gray-100 rounded mb-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={stat.id}
                        className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center ${stat.iconColor} shrink-0`}
                          >
                            <IconComponent size={20} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-2xl font-bold text-gray-900 truncate">
                              {stat.value}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{stat.title}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 w-full">
                {/* Line Chart */}
                <div className="col-span-12 lg:col-span-6 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        Sales Performance
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        Revenue trend over the last 12 months
                      </p>
                    </div>
                    <select className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700">
                      This Year
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={salesPerformanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#1E40AF"
                        strokeWidth={3}
                        dot={{ fill: '#1E40AF', r: 4 }}
                        activeDot={{ r: 6, fill: '#1E40AF' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="col-span-12 lg:col-span-3 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        Monthly Revenue
                      </h3>
                      <p className="text-sm text-gray-500 truncate">Revenue by month</p>
                    </div>
                    <select className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-lg text-xs font-semibold text-gray-700">
                      This Year
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#061B5A"
                        radius={[4, 4, 0, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="col-span-12 lg:col-span-3 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      Sales by Category
                    </h3>
                    <p className="text-sm text-gray-500 truncate">Distribution by revenue</p>
                  </div>
                  <div className="flex items-center justify-center h-[220px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={salesByCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {salesByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xl font-bold text-gray-900">${salesByCategoryData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {salesByCategoryData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <p className="text-xs font-medium text-gray-700 truncate">
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Insights */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 w-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4 truncate">
                  Business Insights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Activity, title: 'AI Sales Insights' },
                    { icon: Target, title: 'Top Performing Category' },
                    { icon: Box, title: 'Highest Revenue Month' },
                    { icon: Layers, title: 'Best Selling Product' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg border border-gray-100"
                      >
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 shrink-0">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            AI-powered insights from your sales data to help you
                            make better decisions.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reports Table & Right Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                {/* Reports Table */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        Generated Reports
                      </h3>
                      <button className="text-sm font-semibold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">
                        View All Reports
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Report Name
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date Generated
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Created By
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {generatedReports.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 shrink-0">
                                    <Box size={18} />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-800 truncate">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-700">
                                  {item.type}
                                </span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">
                                  {item.date}
                                </span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face"
                                    alt="Admin"
                                    className="w-7 h-7 rounded-full object-cover shrink-0"
                                  />
                                  <span className="text-sm font-medium text-gray-800 truncate">
                                    {item.createdBy}
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                {getStatusBadge(item.status)}
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex gap-1.5">
                                  <button className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                                    <Box size={16} />
                                  </button>
                                  <button className="p-1.5 hover:bg-red-50 text-red-700 rounded-lg border border-red-100">
                                    <Plus size={16} />
                                  </button>
                                  <button className="p-1.5 hover:bg-green-50 text-green-700 rounded-lg border border-green-100">
                                    <Download size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                      <p className="text-xs text-gray-500 truncate">
                        Showing 1-1 of 1 results
                      </p>
                      <div className="flex gap-1">
                        <button className="w-8 h-8 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 flex items-center justify-center">
                          ‹
                        </button>
                        <button className="w-8 h-8 bg-[#2563EB] text-white rounded-lg text-xs font-bold flex items-center justify-center">
                          1
                        </button>
                        <button className="w-8 h-8 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center">
                          ›
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column Widgets */}
                <div className="col-span-12 lg:col-span-4 space-y-6 w-full">
                  {/* Top Selling Products */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        Top 5 Best Selling Products
                      </h3>
                      <select className="px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-lg text-xs font-semibold text-gray-700">
                        This Month
                      </select>
                    </div>
                    <div className="space-y-3">
                      {bestSellingProducts.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <Box size={16} className="text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {item.name}
                              </p>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mb-1">
                              <p className="truncate">{item.sku}</p>
                              <p>{item.unitsSold}</p>
                              <p className="font-semibold text-gray-700 truncate">
                                {typeof item.revenue === 'number' ? `$${item.revenue.toLocaleString()}` : item.revenue}
                              </p>
                              <p
                                className={`font-semibold ${
                                  item.growth?.startsWith('+')
                                    ? 'text-green-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {item.growth}
                              </p>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className={"h-1.5 rounded-full " + getProgressColor(
                                  'In Stock'
                                )}
                                style={{
                                  width: `${(item.unitsSold / (bestSellingProducts[0]?.unitsSold || 1)) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inventory Reports */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 truncate">
                      Inventory Reports
                    </h3>
                    <div className="space-y-3">
                      {inventoryReports.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                index === 0
                                  ? 'bg-blue-50 text-blue-700'
                                  : index === 1
                                  ? 'bg-green-50 text-green-700'
                                  : index === 2
                                  ? 'bg-orange-50 text-orange-700'
                                  : index === 3
                                  ? 'bg-purple-50 text-purple-700'
                                  : 'bg-pink-50 text-pink-700'
                              }`}
                            >
                              <Layers size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {item.value}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.growth && (
                              <span
                                className={`text-xs font-semibold ${
                                  item.growth.startsWith('+')
                                    ? 'text-green-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {item.growth}
                              </span>
                            )}
                            {item.button && (
                              <button className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg hover:bg-blue-100">
                                View Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
