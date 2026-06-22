import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesTrendChart({ sales = [] }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const salesTrendData = months.map(month => {
    const currentYear = new Date().getFullYear();
    const monthIndex = months.indexOf(month);
    
    const monthSales = sales.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.getFullYear() === currentYear && saleDate.getMonth() === monthIndex;
    });
    
    return {
      month,
      sales: monthSales.reduce((acc, sale) => acc + (sale.totalAmount || 0), 0)
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Sales Trend</h3>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-[#1E40AF] text-white rounded-lg text-sm font-semibold">Monthly</button>
          <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">Weekly</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={salesTrendData}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#1E40AF"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
            activeDot={{ r: 6, fill: '#1E40AF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
