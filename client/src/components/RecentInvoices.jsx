import { FileText, Download } from 'lucide-react';

export default function RecentInvoices({ sales = [] }) {
  const recentInvoices = sales.slice(0, 5);

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

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Recent Invoices</h3>
        <button className="text-xs font-semibold text-gray-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {recentInvoices.length === 0 ? (
          <div className="text-gray-500 text-center py-5">
            No invoices found.
          </div>
        ) : (
          recentInvoices.map((invoice, index) => (
            <div key={invoice._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                  <FileText size={20} className="text-[#1E40AF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{invoice.invoiceNumber}</p>
                  <p className="text-xs text-gray-500">{invoice.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">${invoice.totalAmount?.toLocaleString()}</span>
                {getStatusBadge(invoice.paymentMethod)}
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <Download size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
