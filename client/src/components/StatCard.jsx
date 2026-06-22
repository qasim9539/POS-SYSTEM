import { ArrowUp, ArrowDown, ShoppingCart, DollarSign, TrendingUp, Package, Receipt } from 'lucide-react';

export default function StatCard({ title, value, growth, isPositive, icon, bgColor, iconColor, label }) {
  // Map icon strings to Lucide components
  const iconMap = {
    '🛒': ShoppingCart,
    '💲': DollarSign,
    '📈': TrendingUp,
    '📦': Package,
    '🧾': Receipt,
  };
  const IconComponent = iconMap[icon] || ShoppingCart;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center ${iconColor}`}>
          <IconComponent size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
              {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {growth}
            </span>
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
