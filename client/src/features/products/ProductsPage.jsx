import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

// ─── SVG Icon wrapper ────────────────────────────────────────────────────────
const Icon = ({ children, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`inline-block ${className}`}>
    {children}
  </svg>
);

// ─── Page Icons ──────────────────────────────────────────────────────────────
const SearchIcon = () => <Icon className="w-4 h-4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const BellIcon = () => <Icon className="w-4 h-4"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Icon>;
const FilterIcon = () => <Icon className="w-4 h-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const ChevronDownIcon = () => <Icon className="w-3 h-3"><polyline points="6 9 12 15 18 9"/></Icon>;
const PlusIcon = () => <Icon className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
const EditIcon = () => <Icon className="w-3.5 h-3.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>;
const TrashIcon = () => <Icon className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></Icon>;
const EyeIcon = () => <Icon className="w-3.5 h-3.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>;

// ─── SVG Product Images ──────────────────────────────────────────────────────
const HeadphonesImg = () => (
  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 18v-6a9 9 0 0118 0v6"/>
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/>
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
    </svg>
  </div>
);
const WatchImg = () => (
  <div className="w-9 h-9 rounded-lg bg-[#2e3b5e] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="6" width="12" height="12" rx="3" ry="3"/>
      <path d="M9 6V2h6v4M9 18v4h6v-4"/>
    </svg>
  </div>
);
const ShoesImg = () => (
  <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 18l4-8 3 4 3-6 2 3h8v4a2 2 0 01-2 2H4a2 2 0 01-2-2z"/>
    </svg>
  </div>
);
const CoffeeImg = () => (
  <div className="w-9 h-9 rounded-lg bg-amber-900 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8h1a4 4 0 010 8h-1"/>
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  </div>
);
const UsbImg = () => (
  <div className="w-9 h-9 rounded-lg bg-slate-600 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 12 16 12 14 15 10 9 8 12 2 12"/>
    </svg>
  </div>
);
const ToolImg = () => (
  <div className="w-9 h-9 rounded-lg bg-[#b45309] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  </div>
);
const DefaultImg = () => (
  <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  </div>
);

const productImgMap = {
  "Wireless Headphones Pro": <HeadphonesImg />,
  "Smart Watch Series X": <WatchImg />,
  "Running Shoes Pro": <ShoesImg />,
  "USB-C Hub 7-Port": <UsbImg />,
  "Coffee Blend Premium 1kg": <CoffeeImg />,
  "Garden Tool Set 5-Piece": <ToolImg />,
  "Noise Cancelling Earbuds": <HeadphonesImg />,
  "Yoga Mat Non-Slip": <ShoesImg />,
};

// ─── Pre-registered Barcode Catalog ──────────────────────────────────────────
const BARCODE_CATALOG = {
  "8801097230412": {
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 248.00,
    cost: 120.00,
    lowStockThreshold: 10,
    description: "Premium sound canceling headphones."
  },
  "8801097230559": {
    name: "Smart Watch Series X",
    category: "Electronics",
    price: 449.00,
    cost: 210.00,
    lowStockThreshold: 5,
    description: "Multi-functional smart wearable."
  },
  "8801097230665": {
    name: "Running Shoes Pro",
    category: "Clothing",
    price: 215.00,
    cost: 89.00,
    lowStockThreshold: 15,
    description: "Lightweight professional running sneakers."
  },
  "8801097230771": {
    name: "USB-C Hub 7-Port",
    category: "Electronics",
    price: 69.00,
    cost: 28.00,
    lowStockThreshold: 20,
    description: "High speed multi-port extension hub."
  },
  "8801097230887": {
    name: "Coffee Blend Premium 1kg",
    category: "Food & Bev",
    price: 15.00,
    cost: 6.50,
    lowStockThreshold: 10,
    description: "Rich aromatic roasted coffee beans."
  },
  "8801097230993": {
    name: "Garden Tool Set 5-Piece",
    category: "Home & Garden",
    price: 70.00,
    cost: 31.00,
    lowStockThreshold: 5,
    description: "Premium heavy-duty rust-free gardening tools."
  }
};

export default function ProductsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  
  // Barcode Scanning State
  const [barcodeInput, setBarcodeInput] = useState("");
  const [lastScanned, setLastScanned] = useState(null);
  const [scanMessage, setScanMessage] = useState(null);
  
  // Registration Modal State (For new barcodes)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerBarcode, setRegisterBarcode] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Electronics");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCost, setNewProductCost] = useState("");
  const [newProductStock, setNewProductStock] = useState("1");
  const [newProductThreshold, setNewProductThreshold] = useState("5");
  const [newProductDesc, setNewProductDesc] = useState("");

  // Dynamic Products State loaded from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to map backend product to frontend structure
  const mapBackendProduct = (p) => ({
    id: p._id,
    barcode: p.sku,
    name: p.name,
    category: p.category,
    price: p.sellingPrice,
    cost: p.purchasePrice,
    stock: p.stockQuantity,
    lowStockThreshold: p.lowStockThreshold || 5,
    description: p.description || ""
  });

  // Fetch products from backend Express API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/products');
      if (Array.isArray(res.data)) {
        const mapped = res.data.map(mapBackendProduct);
        setProducts(mapped);
      } else {
        console.error("Expected array but got:", res.data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const barcodeInputRef = useRef(null);

  // Beep sound generator using Web Audio API
  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime); // Crisp High frequency
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12); // Short beep (120ms)

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Web Audio API error:", e);
    }
  };

  // Auto-focus barcode input for simulated hardware scanner
  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, [showRegisterModal]);

  // Handle scanned barcodes
  const handleBarcodeScan = async (code) => {
    if (!code || code.trim() === "") return;
    
    // Play hardware scanner beep sound
    playBeep();
    setLastScanned(code);
    
    // Check if barcode exists in current products
    const existingProduct = products.find(p => p.barcode === code);
    
    if (existingProduct) {
      // Product exists -> Increment stock in backend and UI
      const newStock = existingProduct.stock + 1;
      try {
        const res = await axios.put(`/api/products/${existingProduct.id}`, {
          stockQuantity: newStock
        });
        const updatedProduct = mapBackendProduct(res.data);
        setProducts(prev => prev.map(p => p.id === existingProduct.id ? updatedProduct : p));
        setScanMessage({
          type: "success",
          text: `"${existingProduct.name}" scanned! Stock incremented to ${newStock}.`
        });
        setBarcodeInput("");
      } catch (err) {
        console.error("Error updating stock quantity:", err);
        setScanMessage({
          type: "error",
          text: `Failed to update stock for "${existingProduct.name}".`
        });
      }
    } else {
      // Check if it's in our catalog of known items
      const catalogItem = BARCODE_CATALOG[code];
      if (catalogItem) {
        // Add item from catalog
        try {
          const res = await axios.post('/api/products', {
            name: catalogItem.name,
            sku: code,
            category: catalogItem.category,
            sellingPrice: catalogItem.price,
            purchasePrice: catalogItem.cost,
            stockQuantity: 1,
            lowStockThreshold: catalogItem.lowStockThreshold,
            description: catalogItem.description
          });
          const newProduct = mapBackendProduct(res.data);
          setProducts(prev => [newProduct, ...prev]);
          setScanMessage({
            type: "success",
            text: `"${catalogItem.name}" scanned and registered automatically from global registry!`
          });
          setBarcodeInput("");
        } catch (err) {
          console.error("Error auto-registering catalog product:", err);
          setScanMessage({
            type: "error",
            text: `Failed to auto-register catalog product "${catalogItem.name}".`
          });
        }
      } else {
        // Unregistered barcode -> Open Registration Modal
        setRegisterBarcode(code);
        setNewProductName("");
        setNewProductCategory("Electronics");
        setNewProductPrice("");
        setNewProductCost("");
        setNewProductStock("1");
        setNewProductThreshold("5");
        setNewProductDesc("");
        setShowRegisterModal(true);
        setScanMessage(null);
      }
    }
    
    // Auto-clear notification after 4.5 seconds
    setTimeout(() => {
      setScanMessage(null);
    }, 4500);
  };

  // Submit manual registration
  const handleRegisterProduct = async (e) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    try {
      const res = await axios.post('/api/products', {
        name: newProductName,
        sku: registerBarcode,
        category: newProductCategory,
        sellingPrice: parseFloat(newProductPrice) || 0,
        purchasePrice: parseFloat(newProductCost) || 0,
        stockQuantity: parseInt(newProductStock) || 0,
        lowStockThreshold: parseInt(newProductThreshold) || 5,
        description: newProductDesc
      });
      const newProduct = mapBackendProduct(res.data);
      setProducts(prev => [newProduct, ...prev]);
      setShowRegisterModal(false);
      setBarcodeInput("");
      setScanMessage({
        type: "success",
        text: `New product "${newProductName}" successfully registered under barcode: ${registerBarcode}!`
      });
    } catch (err) {
      console.error("Error manually registering product:", err);
      alert(err.response?.data?.message || "Failed to register product");
    }
    
    setTimeout(() => {
      setScanMessage(null);
    }, 4500);
  };

  // Delete product handler
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  // Category and Search Filtering
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.barcode.includes(searchQuery) ||
                          (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Price (Low-High)") return a.price - b.price;
    if (sortBy === "Price (High-Low)") return b.price - a.price;
    if (sortBy === "Stock") return b.stock - a.stock;
    return 0;
  });

  // Counters
  const totalCount = products.length;
  const inStockCount = products.filter(p => p.stock > p.lowStockThreshold).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Container */}
      <main className={`flex-1 overflow-y-auto flex flex-col h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
            <p className="text-xs text-gray-400">Home / <span className="text-blue-600 font-medium">Products</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-400 w-48">
              <SearchIcon />
              <span>Search products...</span>
              <span className="ml-auto text-xs bg-white border border-gray-200 rounded px-1">⌘K</span>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <BellIcon />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="text-xs">
                <p className="font-semibold text-gray-800">Alex Morgan</p>
                <p className="text-gray-400">Admin</p>
              </div>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-6 space-y-6 flex-1 flex gap-6 overflow-hidden items-stretch">
          
          {/* LEFT SECTION - Product List, Filters, Table */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
            
            {/* Stat Counters */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-gray-800">{loading ? '...' : totalCount.toLocaleString()}</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              </div>
              <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">In Stock</p>
                  <p className="text-2xl font-bold text-gray-800">{loading ? '...' : inStockCount.toLocaleString()}</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-800">{loading ? '...' : lowStockCount.toLocaleString()}</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>
              <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-800">{loading ? '...' : outOfStockCount.toLocaleString()}</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
            </div>

            {/* Filter and Table Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1">
              
              {/* Filter Row */}
              <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                
                {/* Search products input */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus-within:border-blue-400 focus-within:bg-white transition-all">
                  <SearchIcon />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Category Tags */}
                <div className="flex gap-2 items-center overflow-x-auto max-w-lg scrollbar-hide py-1">
                  {["All", "Electronics", "Clothing", "Food & Bev", "Home & Garden"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      {cat === "All" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>

                {/* Sort / Export */}
                <div className="flex gap-3 items-center">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600">
                    <span className="mr-1">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent font-semibold outline-none cursor-pointer text-gray-800"
                    >
                      <option>Name</option>
                      <option>Price (Low-High)</option>
                      <option>Price (High-Low)</option>
                      <option>Stock</option>
                    </select>
                  </div>
                  <button className="flex items-center gap-1 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-600 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer">
                    📤 Export
                  </button>
                </div>

              </div>

              {/* Product list table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-450 uppercase text-[10px] tracking-wider font-bold">
                      <th className="px-5 py-3.5 font-bold">Product</th>
                      <th className="px-5 py-3.5 font-bold">Category</th>
                      <th className="px-5 py-3.5 font-bold text-right">Price</th>
                      <th className="px-5 py-3.5 font-bold text-right">Cost</th>
                      <th className="px-5 py-3.5 font-bold text-center">Stock</th>
                      <th className="px-5 py-3.5 font-bold text-center">Status</th>
                      <th className="px-5 py-3.5 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-10 text-sm text-gray-400">
                          No products found matching filters. Scan a barcode to register it!
                        </td>
                      </tr>
                    ) : (
                      sortedProducts.map((p) => {
                        const isOutOfStock = p.stock === 0;
                        const isLowStock = p.stock > 0 && p.stock <= p.lowStockThreshold;
                        
                        let statusColor = "bg-green-50 text-green-700 border-green-200";
                        let statusText = "In Stock";
                        if (isOutOfStock) {
                          statusColor = "bg-red-50 text-red-700 border-red-200";
                          statusText = "Out of Stock";
                        } else if (isLowStock) {
                          statusColor = "bg-amber-50 text-amber-700 border-amber-200";
                          statusText = "Low Stock";
                        }

                        return (
                          <tr key={p.id} className="border-b border-gray-150 last:border-0 hover:bg-gray-50/70 transition-colors">
                            {/* Product Info */}
                            <td className="px-5 py-3 flex items-center gap-3">
                              {productImgMap[p.name] || <DefaultImg />}
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                                <p className="text-[10px] text-gray-400">SKU-{p.barcode.slice(-4)} | <span className="font-mono">{p.barcode}</span></p>
                              </div>
                            </td>
                            {/* Category */}
                            <td className="px-5 py-3 text-xs text-gray-600">
                              <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-100">
                                {p.category}
                              </span>
                            </td>
                            {/* Price */}
                            <td className="px-5 py-3 text-xs text-gray-800 text-right font-semibold">
                              ${p.price.toFixed(2)}
                            </td>
                            {/* Cost */}
                            <td className="px-5 py-3 text-xs text-gray-500 text-right">
                              ${p.cost.toFixed(2)}
                            </td>
                            {/* Stock */}
                            <td className="px-5 py-3 text-xs text-gray-800 text-center font-bold">
                              {p.stock} <span className="text-[10px] text-gray-400 font-normal">pcs</span>
                            </td>
                            {/* Status */}
                            <td className="px-5 py-3 text-center">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                                {statusText}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="px-5 py-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-1 hover:bg-blue-50 text-blue-500 rounded hover:text-blue-700 transition-all cursor-pointer" title="View Details">
                                  <EyeIcon />
                                </button>
                                <button className="p-1 hover:bg-amber-50 text-amber-500 rounded hover:text-amber-700 transition-all cursor-pointer" title="Edit Product">
                                  <EditIcon />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(p.id, p.name)}
                                  className="p-1 hover:bg-red-50 text-red-500 rounded hover:text-red-700 transition-all cursor-pointer" 
                                  title="Delete Product"
                                >
                                  <TrashIcon />
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

              {/* Pagination */}
              <div className="px-5 py-3.5 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400 bg-gray-50/50 rounded-b-xl">
                <span>Showing 1-{sortedProducts.length} of {filteredProducts.length} products</span>
                <div className="flex gap-1">
                  <button className="px-2.5 py-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 font-bold transition-all disabled:opacity-50" disabled>‹</button>
                  <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded font-bold transition-all">1</button>
                  <button className="px-3.5 py-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 font-bold transition-all">2</button>
                  <button className="px-3.5 py-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 font-bold transition-all">3</button>
                  <span className="px-2 py-1">...</span>
                  <button className="px-3.5 py-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 font-bold transition-all">356</button>
                  <button className="px-2.5 py-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 font-bold transition-all">›</button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SECTION - Barcode Scanner Panel */}
          <div className="w-[340px] flex flex-col gap-5 shrink-0">
            
            {/* Scanner Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
              <div>
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="text-blue-600">⚡</span> Barcode Scanner
                </h2>
                <p className="text-[11px] text-gray-400 leading-snug mt-1">
                  Scanner automatically matches barcodes to products. Scanned items increase stock by +1.
                </p>
              </div>

              {/* Scan Notification Message */}
              {scanMessage && (
                <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 animate-bounce ${
                  scanMessage.type === "success" 
                    ? "bg-green-50 border-green-200 text-green-800" 
                    : "bg-red-50 border-red-200 text-red-800"
                }`}>
                  <span className="text-sm">🔔</span>
                  <p className="leading-tight">{scanMessage.text}</p>
                </div>
              )}

              {/* Scanning visual simulator */}
              <div className="relative h-32 rounded-lg bg-gray-900 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center overflow-hidden group shadow-inner">
                {/* Looping red laser line */}
                <div className="absolute left-0 w-full h-[2px] bg-red-500 shadow-[0_0_8px_#ef4444] animate-[pulse_1.5s_infinite] top-1/2 -translate-y-1/2" />
                <div className="absolute left-0 w-full h-[1px] bg-red-400 animate-[bounce_2s_infinite]" />
                
                {/* Tech target reticle corners */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-blue-500" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-blue-500" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-blue-500" />

                {/* Simulated Camera Feed Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                <div className="flex flex-col items-center gap-1 z-5 text-center px-4">
                  {/* SVG Barcode icon representation */}
                  <svg className="w-16 h-8 text-gray-500 group-hover:text-blue-400 transition-colors" viewBox="0 0 100 40" fill="currentColor">
                    <rect x="0" y="0" width="3" height="40"/>
                    <rect x="5" y="0" width="1" height="40"/>
                    <rect x="8" y="0" width="6" height="40"/>
                    <rect x="16" y="0" width="2" height="40"/>
                    <rect x="20" y="0" width="4" height="40"/>
                    <rect x="26" y="0" width="1" height="40"/>
                    <rect x="29" y="0" width="5" height="40"/>
                    <rect x="36" y="0" width="2" height="40"/>
                    <rect x="40" y="0" width="6" height="40"/>
                    <rect x="48" y="0" width="1" height="40"/>
                    <rect x="51" y="0" width="4" height="40"/>
                    <rect x="57" y="0" width="3" height="40"/>
                    <rect x="62" y="0" width="1" height="40"/>
                    <rect x="65" y="0" width="5" height="40"/>
                    <rect x="72" y="0" width="2" height="40"/>
                    <rect x="76" y="0" width="4" height="40"/>
                    <rect x="82" y="0" width="1" height="40"/>
                    <rect x="85" y="0" width="6" height="40"/>
                    <rect x="93" y="0" width="2" height="40"/>
                    <rect x="97" y="0" width="3" height="40"/>
                  </svg>
                  <p className="text-[10px] text-gray-500 font-semibold tracking-wider select-none">SCANNER ACTIVE</p>
                </div>
              </div>

              {/* Hardware Scanner Focus Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-semibold uppercase">Scan Barcode Input</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full text-xs focus-within:border-blue-400 focus-within:bg-white transition-all">
                  <span className="text-gray-400 mr-2">🔎</span>
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleBarcodeScan(barcodeInput);
                      }
                    }}
                    placeholder="Enter or Scan Barcode..."
                    className="bg-transparent outline-none w-full text-gray-800 font-mono font-bold"
                  />
                  {barcodeInput && (
                    <button 
                      onClick={() => setBarcodeInput("")}
                      className="text-gray-400 hover:text-gray-600 ml-1"
                    >
                      ✖
                    </button>
                  )}
                </div>
                <p className="text-[9px] text-gray-400 leading-tight">
                  Scanners mimic keyboards by typing code and pressing Enter. Type a barcode and press **Enter** to test!
                </p>
                <button 
                  onClick={() => handleBarcodeScan(barcodeInput)}
                  className="w-full mt-2 bg-blue-600 text-white rounded-lg py-2 text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
                >
                  🚀 Trigger Manual Scan
                </button>
              </div>

              {/* Pre-registered Scans Shortcuts */}
              <div className="border-t border-gray-150 pt-3 flex flex-col gap-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Barcode Test catalog</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <button 
                    onClick={() => handleBarcodeScan("8801097230412")}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-left hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer font-semibold text-gray-700"
                  >
                    🔋 Headphones
                    <span className="block font-mono text-[9px] text-gray-400">8801097230412</span>
                  </button>
                  <button 
                    onClick={() => handleBarcodeScan("8801097230559")}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-left hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer font-semibold text-gray-700"
                  >
                    ⌚ Smart Watch
                    <span className="block font-mono text-[9px] text-gray-400">8801097230559</span>
                  </button>
                  <button 
                    onClick={() => handleBarcodeScan("8801097230665")}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-left hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer font-semibold text-gray-700"
                  >
                    👟 Running Shoes
                    <span className="block font-mono text-[9px] text-gray-400">8801097230665</span>
                  </button>
                  <button 
                    onClick={() => handleBarcodeScan("8801097230887")}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-left hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer font-semibold text-gray-700"
                  >
                    ☕ Premium Coffee
                    <span className="block font-mono text-[9px] text-gray-400">8801097230887</span>
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const sampleCodes = ["8801097230412", "8801097230559", "8801097230665", "8801097230771", "8801097230887", "8801097230993"];
                    const randomCode = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
                    handleBarcodeScan(randomCode);
                  }}
                  className="w-full bg-[#1a2744] hover:bg-[#25375f] text-white text-xs font-semibold rounded-lg py-2 mt-1 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  🎲 Simulate Random Scan
                </button>
                <button 
                  onClick={() => {
                    const uniqueCode = "990" + Math.floor(1000000000 + Math.random() * 9000000000);
                    handleBarcodeScan(uniqueCode);
                  }}
                  className="w-full bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 text-xs font-semibold rounded-lg py-2 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  🆕 Scan Unknown Barcode
                </button>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="bg-[#1a2744] text-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-bold flex items-center gap-1.5 text-blue-200">
                ℹ️ Team Leader Rule
              </h3>
              <p className="text-[11px] leading-relaxed text-blue-100">
                Products standard list me manually add nahi ho sakte. Hardware barcode reader se input le kar stock update ya automatically register hota hai.
              </p>
              <div className="bg-white/10 rounded-lg p-2 text-[10px] text-blue-200 font-mono">
                Scan Code ➔ System Auto Check ➔ (Update Stock +1) OR (Register New)
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ─── REGISTER NEW PRODUCT MODAL (Only opens for unregistered barcode scans) ─── */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden border border-gray-200 shadow-2xl animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Register New Product</h3>
                <p className="text-[10px] text-blue-200">Unknown barcode scanned. Create product definition below.</p>
              </div>
              <button 
                onClick={() => {
                  setShowRegisterModal(false);
                  setBarcodeInput("");
                }}
                className="text-white/80 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleRegisterProduct} className="p-6 space-y-4">
              
              {/* Barcode (Read only) */}
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Barcode (Assigned)</label>
                <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-gray-600 select-all flex items-center justify-between">
                  <span>{registerBarcode}</span>
                  <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-sans uppercase">Required</span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Wireless Pro Controller"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Category</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none cursor-pointer"
                >
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Food & Bev</option>
                  <option>Home & Garden</option>
                </select>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Selling Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Cost Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newProductCost}
                    onChange={(e) => setNewProductCost(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Stock and Low Stock Threshold */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Initial Stock</label>
                  <input 
                    type="number" 
                    required
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Low Stock Alert Level</label>
                  <input 
                    type="number" 
                    required
                    value={newProductThreshold}
                    onChange={(e) => setNewProductThreshold(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold mb-1 uppercase">Description</label>
                <textarea 
                  rows="2"
                  placeholder="Optional product description..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:border-blue-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setShowRegisterModal(false);
                    setBarcodeInput("");
                  }}
                  className="bg-gray-150 border border-gray-250 text-gray-600 hover:bg-gray-200 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold px-5 py-2 rounded-lg cursor-pointer shadow-sm"
                >
                  Save and Register
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
