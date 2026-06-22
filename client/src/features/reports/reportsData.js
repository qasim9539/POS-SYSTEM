import { Box, Layers, TrendingUp, AlertCircle, Activity, Target } from 'lucide-react';

export const stats = [
  {
    id: 1,
    title: 'Total SKUs',
    value: '0',
    icon: Box,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Total Units',
    value: '0',
    icon: Layers,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    id: 3,
    title: 'Reserved',
    value: '0',
    icon: Box,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    id: 4,
    title: 'Out of Stock',
    value: '0',
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  }
];

export const salesPerformanceData = [
  { month: 'Jan', sales: 0 },
  { month: 'Feb', sales: 0 },
  { month: 'Mar', sales: 0 },
  { month: 'Apr', sales: 0 },
  { month: 'May', sales: 0 },
  { month: 'Jun', sales: 0 },
  { month: 'Jul', sales: 0 },
  { month: 'Aug', sales: 0 },
  { month: 'Sep', sales: 0 },
  { month: 'Oct', sales: 0 },
  { month: 'Nov', sales: 0 },
  { month: 'Dec', sales: 0 }
];

export const monthlyRevenueData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 }
];

export const salesByCategoryData = [
  { name: 'Electronics', value: 0, color: '#1E40AF' },
  { name: 'Clothing', value: 0, color: '#22C55E' },
  { name: 'Food & Beverage', value: 0, color: '#F59E0B' },
  { name: 'Home & Garden', value: 0, color: '#8B5CF6' }
];

export const generatedReports = [
  {
    id: 1,
    name: 'Monthly Sales Report',
    type: 'Sales Report',
    date: 'Dec 18, 2024',
    createdBy: 'Admin',
    status: 'Completed'
  }
];

export const bestSellingProducts = [
  { name: 'Product 1', sku: 'SKU-0001', unitsSold: 0, revenue: '$0', growth: '+0%' }
];

export const inventoryReports = [
  { name: 'Stock Turnover Rate', value: '0 turns per year', growth: '+0%' },
  { name: 'Inventory Value', value: '$0', growth: '+0%' },
  { name: 'Dead Stock Analysis', value: '$0', growth: '-0%' },
  { name: 'Low Stock Products', value: '0 products', button: true },
  { name: 'Reorder Recommendations', value: '0 products', button: true }
];
