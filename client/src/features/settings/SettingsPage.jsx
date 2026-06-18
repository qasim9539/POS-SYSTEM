import React from 'react';
import { LayoutGrid, Bell, AlertTriangle, Package } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <span className={`p-2 rounded-xl ${color}`}>{icon}</span>
    </div>
    <p className="text-4xl font-extrabold text-gray-900">{value}</p>
  </div>
);

const ProductRiskCard = ({ product, id, percentage }) => (
  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl bg-white gap-3">
    <div>
      <p className="text-sm font-semibold text-gray-900">{product}</p>
      <p className="text-xs text-gray-500">{id}</p>
    </div>
    <p className="text-sm font-bold text-red-600">{percentage}% Risk</p>
  </div>
);

const AlertCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <main className="flex-grow p-10 space-y-10">
        <h1 className="text-2xl font-bold">Alert Center</h1>
        <section className="grid grid-cols-2 gap-6">
          <StatCard title="Critical Alerts" value="12" icon={<AlertTriangle size={20} />} color="bg-red-100 text-red-800" />
          <StatCard title="Low Stock" value="34" icon={<Package size={20} />} color="bg-orange-100 text-orange-800" />
        </section>
        <section className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Top Risk Products</h2>
          <div className="space-y-4">
            <ProductRiskCard product='27" Monitor Ultra' id="SKU-L2304" percentage={70} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlertCenter;