export default function TopSellingProducts({ sales = [] }) {
  const productQuantities = {};
  
  sales.forEach(sale => {
    sale.items?.forEach(item => {
      const productName = item.product?.name || 'Unknown';
      productQuantities[productName] = (productQuantities[productName] || 0) + (item.quantity || 0);
    });
  });
  
  const sortedProducts = Object.entries(productQuantities)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
    
  const maxQuantity = sortedProducts[0]?.quantity || 1;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Top Selling Products</h3>
        <button className="text-xs font-semibold text-gray-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {sortedProducts.length === 0 ? (
          <div className="text-gray-500 text-center py-5">
            No sales data available.
          </div>
        ) : (
          sortedProducts.map((product, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border border-gray-100">
                <span className="text-sm font-bold text-gray-600">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{product.name}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-[#0B2A78] h-1.5 rounded-full"
                    style={{ width: `${(product.quantity / maxQuantity) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.quantity}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
