import { useState } from 'react';
import { Filter, ArrowUpDown, Download, Eye, Trash2 } from 'lucide-react';
import { salesService } from '../features/sales/services/salesService.js';

export default function RecentSalesTable({ sales = [], loading, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sale?')) return;
    try {
      setDeleting(id);
      await salesService.deleteSale(id);
      onDelete?.();
    } catch (err) {
      setError(err.message || 'Failed to delete sale');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (paymentMethod) => {
    switch (paymentMethod) {
      case 'Cash':
        return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">Cash</span>;
      case 'Card':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">Card</span>;
      case 'Online':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">Online</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">{paymentMethod}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex items-center justify-center">
        <div className="text-gray-500">Loading sales...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Recent Sales</h3>
        <div className="flex gap-2">
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <ArrowUpDown size={18} />
            Sort
          </button>
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
      {error && (
        <div className="px-5 py-3 bg-red-50 border-b border-gray-100 text-red-700">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Invoice ID</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Products</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total Quantity</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total Amount</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Payment Method</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sales Date</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sales.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-5 py-10 text-center text-gray-500">
                  No sales found.
                </td>
              </tr>
            ) : (
              sales.slice(0, 5).map((sale) => (
                <tr key={sale._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-800">{sale.invoiceNumber}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-800">{sale.customerName}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {sale.items?.map(item => item.product?.name || 'Unknown').join(', ')}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 font-semibold">
                      {sale.items?.reduce((acc, item) => acc + (item.quantity || 0), 0)}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-800">${sale.totalAmount?.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getStatusBadge(sale.paymentMethod)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 hover:bg-red-50 text-red-700 rounded-lg border border-red-100"
                        onClick={() => handleDelete(sale._id)}
                        disabled={deleting === sale._id}
                      >
                        {deleting === sale._id ? '...' : <Trash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-{Math.min(5, sales.length)} of {sales.length} results</p>
      </div>
    </div>
  );
}
