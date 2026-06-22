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
} from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Header from '../../components/Header.jsx';
import { productsService } from '../../features/products/services/productsService.js';

export default function InventoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterWarehouse, setFilterWarehouse] = useState('All');
  const [adjustmentProduct, setAdjustmentProduct] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('Add Stock');
  const [adjustmentQuantity, setAdjustmentQuantity] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('Received');
  const [adjustmentNotes, setAdjustmentNotes] = useState('');
  const [adjustmentLoading, setAdjustmentLoading] = useState(false);
  const [recentAdjustments, setRecentAdjustments] = useState([
    { id: 1, product: 'Wireless Mouse', quantity: 50, type: 'Add', reason: 'Received', location: 'Warehouse A', time: '2h ago' },
    { id: 2, product: 'Mechanical Keyboard', quantity: -5, type: 'Remove', reason: 'Damaged', location: 'Warehouse B', time: '5h ago' },
    { id: 3, product: 'USB-C Hub', quantity: 20, type: 'Add', reason: 'Returned', location: 'Warehouse C', time: '1d ago' },
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await productsService.getAllProducts();
      setInventoryData(products.map(p => ({
        ...p,
        id: p._id,
        total: p.stockQuantity,
        reserved: 0,
        available: p.stockQuantity,
        status: p.stockQuantity === 0 ? 'Out of Stock' : p.stockQuantity <= (p.lowStockThreshold || 5) ? 'Low Stock' : 'In Stock',
        category: p.category,
        location: 'Warehouse A', // default location since products don't have location yet
        updated: new Date(p.updatedAt || p.createdAt).toLocaleDateString(),
      })));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdjustment = async (e) => {
    e.preventDefault();
    if (!adjustmentProduct || !adjustmentQuantity) {
      setError('Please select a product and enter quantity');
      return;
    }
    
    const quantity = parseInt(adjustmentQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    const product = inventoryData.find(p => p.id === adjustmentProduct);
    if (!product) return;

    setAdjustmentLoading(true);
    try {
      let newStockQuantity;
      if (adjustmentType === 'Add Stock') {
        newStockQuantity = product.stockQuantity + quantity;
      } else if (adjustmentType === 'Remove Stock') {
        if (product.stockQuantity < quantity) {
          setError('Not enough stock to remove');
          setAdjustmentLoading(false);
          return;
        }
        newStockQuantity = product.stockQuantity - quantity;
      } else {
        newStockQuantity = product.stockQuantity; // Transfer doesn't change quantity for now
      }

      await productsService.updateProduct(product.id, { stockQuantity: newStockQuantity });
      
      // Add to recent adjustments
      const newAdjustment = {
        id: Date.now(),
        product: product.name,
        quantity: adjustmentType === 'Add Stock' ? quantity : -quantity,
        type: adjustmentType === 'Add Stock' ? 'Add' : 'Remove',
        reason: adjustmentReason,
        location: 'Warehouse A',
        time: 'Just now',
      };
      setRecentAdjustments([newAdjustment, ...recentAdjustments]);
      
      // Reset form
      setAdjustmentProduct('');
      setAdjustmentType('Add Stock');
      setAdjustmentQuantity('');
      setAdjustmentReason('Received');
      setAdjustmentNotes('');
      
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply adjustment');
    } finally {
      setAdjustmentLoading(false);
    }
  };

  const handleQuickAdjust = async (product, type) => {
    try {
      let newStockQuantity;
      if (type === 'Add') {
        newStockQuantity = product.stockQuantity + 1;
      } else {
        if (product.stockQuantity <= 0) return;
        newStockQuantity = product.stockQuantity - 1;
      }
      await productsService.updateProduct(product.id, { stockQuantity: newStockQuantity });
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stock');
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'In Stock') {
      return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">In Stock</span>;
    }
    if (status === 'Low Stock') {
      return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold">Low Stock</span>;
    }
    return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold">Out of Stock</span>;
  };

  const getProgressColor = (status) => {
    if (status === 'In Stock') return 'bg-green-500';
    if (status === 'Low Stock') return 'bg-orange-500';
    return 'bg-red-500';
  };

  const totalSKUs = inventoryData.length;
  const totalUnits = inventoryData.reduce((sum, item) => sum + item.total, 0);
  const reservedUnits = 0;
  const outOfStockCount = inventoryData.filter(item => item.status === 'Out of Stock').length;

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesWarehouse = filterWarehouse === 'All' || item.location === filterWarehouse;
    return matchesSearch && matchesStatus && matchesWarehouse;
  });

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}
      
      <div className={`${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 transition-transform duration-300 z-50'}`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          active="inventory"
        />
      </div>

      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <Header
          title="Inventory Tracking"
          breadcrumb="Inventory"
          onToggleSidebar={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              {error}
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full">
            <div className="flex-1 min-w-0 w-full">
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
                  <>
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                          <Box size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 truncate">{totalSKUs}</h3>
                          <p className="text-xs text-gray-500 truncate">Total SKUs</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                          <Layers size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 truncate">{totalUnits}</h3>
                          <p className="text-xs text-gray-500 truncate">Total Units</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 shrink-0">
                          <Lock size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 truncate">{reservedUnits}</h3>
                          <p className="text-xs text-gray-500 truncate">Reserved</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 shrink-0">
                          <AlertCircle size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 truncate">{outOfStockCount}</h3>
                          <p className="text-xs text-gray-500 truncate">Out of Stock</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 w-full">
                <div className="flex flex-wrap gap-3 items-center w-full">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-full text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {['All', 'Warehouse A', 'Warehouse B', 'Warehouse C'].map((warehouse) => (
                      <button
                        key={warehouse}
                        onClick={() => setFilterWarehouse(warehouse)}
                        className={
                          filterWarehouse === warehouse 
                            ? "px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold text-sm" 
                            : "px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-100"
                        }
                      >
                        {warehouse}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700"
                    >
                      <option value="All">Status: All</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-gray-50 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-100">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reserved</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Available</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="9" className="px-5 py-10 text-center text-gray-500">Loading products...</td>
                        </tr>
                      ) : filteredInventory.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-5 py-10 text-center text-gray-500">No products found</td>
                        </tr>
                      ) : (
                        filteredInventory.map((item) => {
                          const progressPercent = item.total > 0 ? Math.min(100, Math.round((item.available / item.total) * 100)) : 0;
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Box size={16} className="text-gray-400" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{item.sku}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-xs text-gray-700 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{item.category}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-700 truncate">{item.location}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm font-semibold text-gray-800">{item.total}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm font-semibold text-amber-600">{item.reserved}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-800">{item.available}</span>
                                  <div className="w-12 bg-gray-100 rounded-full h-1.5 shrink-0">
                                    <div
                                      className={"h-1.5 rounded-full " + getProgressColor(item.status)}
                                      style={{ width: progressPercent + '%' }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500 shrink-0">{progressPercent}%</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                {getStatusBadge(item.status)}
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500 truncate">{item.updated}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleQuickAdjust(item, 'Add')} 
                    className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold hover:bg-green-100"
                  >
                    <Plus size={12} />
                    Add
                  </button>
                  <button 
                    onClick={() => handleQuickAdjust(item, 'Remove')} 
                    className="flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold hover:bg-red-100"
                  >
                    <Minus size={12} />
                    Remove
                  </button>
                </div>
              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-xs text-gray-500 truncate">Showing {filteredInventory.length} of {inventoryData.length} items</p>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 flex items-center justify-center">‹</button>
                    <button className="w-8 h-8 bg-[#2563EB] text-white rounded-lg text-xs font-bold flex items-center justify-center">1</button>
                    <button className="w-8 h-8 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center">›</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 min-w-0">
              {/* Stock Adjustment */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Adjustment</h3>
                <form onSubmit={handleAdjustment} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <select 
                      value={adjustmentProduct} 
                      onChange={(e) => setAdjustmentProduct(e.target.value)} 
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700"
                    >
                      <option value="">Select product...</option>
                      {inventoryData.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                    <select 
                      value={adjustmentType} 
                      onChange={(e) => setAdjustmentType(e.target.value)} 
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700"
                    >
                      <option>Add Stock</option>
                      <option>Remove Stock</option>
                      <option>Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={adjustmentQuantity}
                      onChange={(e) => setAdjustmentQuantity(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <select 
                      value={adjustmentReason} 
                      onChange={(e) => setAdjustmentReason(e.target.value)} 
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700"
                    >
                      <option>Received</option>
                      <option>Damaged</option>
                      <option>Returned</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      placeholder="Add notes..." 
                      rows={2}
                      value={adjustmentNotes}
                      onChange={(e) => setAdjustmentNotes(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-semibold text-sm text-gray-700 resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={adjustmentLoading}
                    className="w-full py-2 bg-[#2563EB] text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    {adjustmentLoading ? 'Applying...' : 'Apply Adjustment'}
                  </button>
                </form>
              </div>

              {/* Recent Adjustments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Adjustments</h3>
                <div className="space-y-3">
                  {recentAdjustments.map(adj => (
                    <div key={adj.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${adj.type === 'Add' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {adj.type === 'Add' ? (
                          <Plus size={14} className="text-green-600" />
                        ) : (
                          <Minus size={14} className="text-red-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{adj.quantity > 0 ? '+' : ''}{adj.quantity} {adj.product}</p>
                        <p className="text-xs text-gray-500">{adj.reason} • {adj.location}</p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{adj.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
