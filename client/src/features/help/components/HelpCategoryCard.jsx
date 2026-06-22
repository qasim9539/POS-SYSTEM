import { Rocket, Package, Boxes, BarChart3 } from 'lucide-react';

export const helpCategories = [
  {
    id: 1,
    icon: <Rocket className="text-blue-600" size={32} />,
    iconBg: "bg-blue-50",
    title: "Getting Started",
    description: "Learn the basics and set up your account quickly."
  },
  {
    id: 2,
    icon: <Package className="text-green-600" size={32} />,
    iconBg: "bg-green-50",
    title: "Product Management",
    description: "Manage your products, categories, and attributes."
  },
  {
    id: 3,
    icon: <Boxes className="text-orange-600" size={32} />,
    iconBg: "bg-orange-50",
    title: "Inventory Management",
    description: "Track stock, manage warehouses, and update inventory."
  },
  {
    id: 4,
    icon: <BarChart3 className="text-purple-600" size={32} />,
    iconBg: "bg-purple-50",
    title: "Sales & Reports",
    description: "Manage sales, invoices, and generate reports."
  }
];

export default function HelpCategoryCard({ category, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-full ${category.iconBg} flex items-center justify-center mx-auto mb-4`}>
        {category.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{category.description}</p>
      <button className="px-6 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
        View Guide
      </button>
    </div>
  );
}