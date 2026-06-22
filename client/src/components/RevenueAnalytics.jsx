import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function RevenueAnalytics({ sales = [] }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const revenueAnalyticsData = months.map(month => {
    const currentYear = new Date().getFullYear();
    const monthIndex = months.indexOf(month);
    
    const monthSales = sales.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.getFullYear() === currentYear && saleDate.getMonth() === monthIndex;
    });
    
    return {
      month,
      revenue: monthSales.reduce((acc, sale) => acc + (sale.totalAmount || 0), 0)
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
        <Legend iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={revenueAnalyticsData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#0B2A78" radius={[4, 4, 0, 0]} barSize={24} name="Revenue (USD)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
