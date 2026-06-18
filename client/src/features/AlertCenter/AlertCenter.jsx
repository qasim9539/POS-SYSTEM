import { useState } from "react";

// ─── SVG Icon wrapper ────────────────────────────────────────────────────────
const Icon = ({ children, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`inline-block ${className}`}>
    {children}
  </svg>
);

// ─── Sidebar Icons ────────────────────────────────────────────────────────────
const DashboardIcon = () => <Icon className="w-4 h-4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>;
const ProductsIcon = () => <Icon className="w-4 h-4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></Icon>;
const InventoryIcon = () => <Icon className="w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const SalesIcon = () => <Icon className="w-4 h-4"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></Icon>;
const ReportsIcon = () => <Icon className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Icon>;
const AlertsIcon = () => <Icon className="w-4 h-4"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Icon>;
const SettingsIcon = () => <Icon className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></Icon>;
const HelpIcon = () => <Icon className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>;
const SearchIcon = () => <Icon className="w-4 h-4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const FilterIcon = () => <Icon className="w-4 h-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const CalendarIcon = () => <Icon className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ChevronDownIcon = () => <Icon className="w-3 h-3"><polyline points="6 9 12 15 18 9"/></Icon>;
const ChevronLeftIcon = () => <Icon className="w-3 h-3"><polyline points="15 18 9 12 15 6"/></Icon>;

// ─── Product Image SVG Icons (Figma style dark bg + white icon) ──────────────
const HeadphonesImg = () => (
  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 18v-6a9 9 0 0118 0v6"/>
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/>
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
    </svg>
  </div>
);
const ShoesImg = () => (
  <div className="w-9 h-9 rounded-lg bg-gray-700 flex items-center justify-center shrink-0">
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
const MonitorImg = () => (
  <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  </div>
);

// Map product name → icon component
const productIconMap = {
  "Wireless Headphones": <HeadphonesImg />,
  "Running Shoes Pro":   <ShoesImg />,
  "Coffee Blend Premium":<CoffeeImg />,
  "USB-C Hub":           <UsbImg />,
  '27" Monitor Ultra':   <MonitorImg />,
};

// ─── Notification color icons ─────────────────────────────────────────────────
const notifIconMap = {
  green:  { bg: "bg-green-100",  color: "text-green-600",  path: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></> },
  orange: { bg: "bg-orange-100", color: "text-orange-500", path: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></> },
  blue:   { bg: "bg-blue-100",   color: "text-blue-500",   path: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
  red:    { bg: "bg-red-100",    color: "text-red-500",    path: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></> },
  teal:   { bg: "bg-teal-100",   color: "text-teal-600",   path: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></> },
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Products",  icon: <ProductsIcon /> },
  { label: "Inventory", icon: <InventoryIcon /> },
  { label: "Sales",     icon: <SalesIcon /> },
  { label: "Reports",   icon: <ReportsIcon /> },
  { label: "Alerts",    icon: <AlertsIcon />, active: true },
  { label: "Settings",  icon: <SettingsIcon /> },
  { label: "Help",      icon: <HelpIcon /> },
];

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`bg-[#1a2744] flex flex-col h-screen sticky top-0 transition-all duration-300 ${collapsed ? "w-16" : "w-56"} shrink-0`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">SmartStock</div>
            <div className="text-blue-300 text-[10px]">Inventory & Sales System</div>
          </div>
        )}
      </div>
      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <button key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${item.active ? "bg-blue-600 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"}`}>
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      {/* Collapse */}
      <button onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 px-4 py-4 text-blue-300 hover:text-white text-xs border-t border-white/10">
        <ChevronLeftIcon />
        {!collapsed && <span>Collapse Menu</span>}
      </button>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, count, delta, deltaDir }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-start gap-4 shadow-sm border border-gray-100">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="text-gray-500 text-xs mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 leading-none">{count}</p>
        <p className={`text-xs mt-1 font-medium ${deltaDir === "up" ? "text-red-500" : "text-green-500"}`}>
          {deltaDir === "up" ? "▲" : "▼"} {delta}%{" "}
          <span className="text-gray-400 font-normal">vs last 7 days</span>
        </p>
      </div>
    </div>
  );
}

// ─── Critical Alert Row ───────────────────────────────────────────────────────
function CriticalAlertRow({ name, sku, stock, date }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      {productIconMap[name] || <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0"/>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400">{sku}</p>
      </div>
      <div className="text-right shrink-0 mr-2">
        <p className="text-xs text-gray-400">Current Stock</p>
        <p className="text-xs font-bold text-red-500">{stock}</p>
        <p className="text-[10px] text-gray-400">{date}</p>
      </div>
      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full shrink-0">Critical</span>
    </div>
  );
}

// ─── Notification Row ─────────────────────────────────────────────────────────
function NotifRow({ color, title, sub, time, dot }) {
  const ic = notifIconMap[color];
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={`w-8 h-8 rounded-lg ${ic.bg} ${ic.color} flex items-center justify-center shrink-0 mt-0.5`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">{ic.path}</svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
        {dot && <span className="w-2 h-2 rounded-full bg-blue-500"/>}
      </div>
    </div>
  );
}

// ─── Top Risk Product ─────────────────────────────────────────────────────────
function RiskProduct({ name, sku, pct, color, stock, depletes }) {
  const ringColor = color === "red" ? "#ef4444" : color === "orange" ? "#f97316" : "#eab308";
  const textColor = color === "red" ? "text-red-500" : color === "orange" ? "text-orange-400" : "text-yellow-500";
  const C = 2 * Math.PI * 16;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      {productIconMap[name] || <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0"/>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400">{sku}</p>
      </div>
      <div className="relative w-9 h-9 shrink-0">
        <svg viewBox="0 0 40 40" className="w-9 h-9 -rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
          <circle cx="20" cy="20" r="16" fill="none" stroke={ringColor} strokeWidth="3"
            strokeDasharray={C} strokeDashoffset={C - (pct/100)*C} strokeLinecap="round"/>
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-500">{stock}</p>
        <p className="text-[10px] text-gray-400">{depletes}</p>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function AlertCenter() {
  const [collapsed, setCollapsed] = useState(false);

  const criticalAlerts = [
    { name: "Wireless Headphones",  sku: "SKU-1042", stock: "2 units", date: "22 Jun 2026, 09:15 AM" },
    { name: "Running Shoes Pro",    sku: "SKU-2218", stock: "1 unit",  date: "22 Jun 2026, 09:05 AM" },
    { name: "Coffee Blend Premium", sku: "SKU-3091", stock: "0 units", date: "22 Jun 2026, 08:50 AM" },
    { name: "USB-C Hub",            sku: "SKU-1175", stock: "1 unit",  date: "22 Jun 2026, 08:30 AM" },
  ];

  const notifications = [
    { color:"green",  title:"Inventory updated",    sub:"Product quantities updated successfully",  time:"10 min ago", dot:true  },
    { color:"orange", title:"Stock replenished",    sub:"Wireless Headphones stock increased",      time:"25 min ago", dot:true  },
    { color:"blue",   title:"Invoice generated",    sub:"INV-10045 has been generated",             time:"45 min ago", dot:true  },
    { color:"red",    title:"Product deleted",      sub:"Old Keyboard Model has been removed",      time:"1 hour ago", dot:false },
    { color:"teal",   title:"Sales target achieved",sub:"Daily sales target of $15,000 achieved",  time:"2 hours ago",dot:true  },
  ];

  const riskProducts = [
    { name:"Wireless Headphones",  sku:"SKU-1042",  pct:95, color:"red",    stock:"Stock: 2 units", depletes:"Depletes by: 24 Jun 2026" },
    { name:"Running Shoes Pro",    sku:"SKU-2218",  pct:85, color:"red",    stock:"Stock: 1 unit",  depletes:"Depletes by: 23 Jun 2026" },
    { name:"Coffee Blend Premium", sku:"SKU-3091",  pct:80, color:"orange", stock:"Stock: 0 units", depletes:"Depletes by: 21 Jun 2026" },
    { name:"USB-C Hub",            sku:"SKU-1175",  pct:70, color:"orange", stock:"Stock: 1 unit",  depletes:"Depletes by: 25 Jun 2026" },
    { name:'27" Monitor Ultra',    sku:"SKU-L5680", pct:60, color:"yellow", stock:"Stock: 4 units", depletes:"Depletes by: 28 Jun 2026" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Alert Center</h1>
            <p className="text-xs text-gray-400">Home / <span className="text-blue-600 font-medium">Alerts</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-400 w-48">
              <SearchIcon />
              <span>Search alerts...</span>
              <span className="ml-auto text-xs bg-white border border-gray-200 rounded px-1">⌘K</span>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <AlertsIcon />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">5</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
              <FilterIcon /> Filter
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
              <CalendarIcon /> Jun 2026 – 22 Jun 2026 <ChevronDownIcon />
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="text-xs">
                <p className="font-semibold text-gray-800">Admin</p>
                <p className="text-gray-400">System Administrator</p>
              </div>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Critical Alerts" count="12" delta="25" deltaDir="up"
              icon={<div className="bg-red-50 rounded-xl p-3"><svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>}/>
            <StatCard label="Low Stock Alerts" count="34" delta="15" deltaDir="up"
              icon={<div className="bg-orange-50 rounded-xl p-3"><svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>}/>
            <StatCard label="Pending Actions" count="18" delta="10" deltaDir="up"
              icon={<div className="bg-blue-50 rounded-xl p-3"><svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>}/>
            <StatCard label="Resolved Alerts" count="67" delta="20" deltaDir="down"
              icon={<div className="bg-green-50 rounded-xl p-3"><svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>}/>
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-3 gap-4">
            {/* Critical Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-800 text-sm">Critical Alerts</h2>
                <button className="text-xs text-blue-600 hover:underline">View All</button>
              </div>
              {criticalAlerts.map((a,i) => <CriticalAlertRow key={i} {...a}/>)}
              <button className="mt-2 w-full text-center text-xs text-blue-600 hover:underline py-1">View All Critical Alerts</button>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-800 text-sm">Recent Notifications</h2>
                <button className="text-xs text-blue-600 hover:underline">View All</button>
              </div>
              {notifications.map((n,i) => <NotifRow key={i} {...n}/>)}
              <button className="mt-2 w-full text-center text-xs text-blue-600 hover:underline py-1">View All Notifications</button>
            </div>

            {/* Top Risk Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-800 text-sm">Top Risk Products</h2>
                <button className="text-xs text-blue-600 hover:underline">View All</button>
              </div>
              {riskProducts.map((r,i) => <RiskProduct key={i} {...r}/>)}
            </div>
          </div>

          {/* Bottom: Smart Insights + Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            {/* Smart Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-4">Smart Insights</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span className="text-xs text-gray-500">Inventory Health</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-xs text-green-500 mt-0.5">▲ 8% vs last month</p>
                  <p className="text-xs text-gray-400 mt-1">Your inventory health is improving.</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                    </div>
                    <span className="text-xs text-gray-500">Most Affected Category</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">Electronics</p>
                  <p className="text-xs text-gray-500">42 alerts</p>
                  <p className="text-xs text-gray-400">35% of total alerts</p>
                  <button className="mt-1 text-xs text-blue-600 hover:underline">View Category Report</button>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                    </div>
                    <span className="text-xs text-gray-500">Recommended Reorder Qty.</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">156 units</p>
                  <p className="text-xs text-gray-500">Across 18 products</p>
                  <p className="text-xs text-gray-400">Est. value: $24,560</p>
                  <button className="mt-1 text-xs text-blue-600 hover:underline">View Recommendations</button>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <span className="text-xs text-gray-500">Upcoming Shortages</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">7 products</p>
                  <p className="text-xs text-gray-500">Will be out of stock</p>
                  <p className="text-xs text-gray-400">Within next 7 days</p>
                  <button className="mt-1 text-xs text-blue-600 hover:underline">View All Shortages</button>
                </div>
              </div>
              {/* AI Recommendation */}
              <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-xl px-3 py-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800">AI Recommendation</p>
                  <p className="text-xs text-gray-500">Consider increasing stock for high-demand products to avoid stockouts and improve sales.</p>
                </div>
                <button className="ml-2 text-xs text-blue-600 hover:underline whitespace-nowrap shrink-0">View Full Analysis</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji:"📄", bg:"bg-blue-50",   label:"Generate Stock Report", sub:"Analyze stock levels" },
                  { emoji:"📋", bg:"bg-indigo-50", label:"Create Purchase Order",  sub:"Restock inventory" },
                  { emoji:"📤", bg:"bg-orange-50", label:"Export Alerts",          sub:"Download alert data" },
                  { emoji:"✉️", bg:"bg-purple-50", label:"Send Notifications",     sub:"Notify team members" },
                ].map((a,i) => (
                  <button key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition-colors text-left">
                    <div className={`w-8 h-8 ${a.bg} rounded-lg flex items-center justify-center text-base shrink-0`}>{a.emoji}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{a.label}</p>
                      <p className="text-xs text-gray-400">{a.sub}</p>
                    </div>
                  </button>
                ))}
                <button className="col-span-2 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition-colors text-left">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Resolve All Alerts</p>
                    <p className="text-xs text-gray-400">Mark all as resolved</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}