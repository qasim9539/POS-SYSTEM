<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";

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
const ChevronLeftIcon = () => <Icon className="w-3 h-3"><polyline points="15 18 9 12 15 6"/></Icon>;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Products",  icon: <ProductsIcon />, path: "/products" },
  { label: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
  { label: "Sales",     icon: <SalesIcon />, path: "/sales" },
  { label: "Reports",   icon: <ReportsIcon />, path: "/reports" },
  { label: "Alerts",    icon: <AlertsIcon />, path: "/alerts" },
  { label: "Settings",  icon: <SettingsIcon />, path: "/settings" },
  { label: "Help",      icon: <HelpIcon />, path: "/help" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
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
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isActive ? "bg-blue-600 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"}`}>
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
=======
import {
  LayoutDashboard,
  Package,
  Box,
  ShoppingCart,
  TrendingUp,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Box as BoxIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ collapsed, setCollapsed, active }) {
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { id: 'products', label: 'Products', path: '/products', icon: Package },
    { id: 'inventory', label: 'Inventory', path: '/inventory', icon: Box },
    { id: 'sales', label: 'Sales', path: '/sales', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', path: '/reports', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', path: '/alerts', icon: Bell },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
    { id: 'help', label: 'Help', path: '/help', icon: HelpCircle },
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-[#061B5A] via-[#0B2476] to-[#061B5A] text-white flex flex-col transition-all duration-300 fixed left-0 top-0 z-50 overflow-y-hidden ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className={`p-5 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        {collapsed ? (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
            <BoxIcon size={24} />
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
              <BoxIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">SmartStock</h2>
              <p className="text-xs text-blue-200">Inventory & Sales System</p>
            </div>
          </>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive =
            (item.id === 'inventory' && location.pathname === '/') ||
            (item.id === 'sales' && location.pathname === '/sales') ||
            location.pathname === item.path ||
            active === item.id;
          const isDisabled = ['dashboard', 'products', 'alerts', 'settings'].includes(item.id);
          
          if (isDisabled) {
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group cursor-not-allowed ${
                  isActive
                    ? 'text-white'
                    : 'text-blue-100 hover:bg-blue-900/50 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl opacity-20 blur-md" />
                )}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl" />
                )}
                <div className="relative flex items-center gap-3">
                  <IconComponent size={collapsed ? 22 : 20} />
                  {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                </div>
              </div>
            );
          }
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${
                isActive
                  ? 'text-white'
                  : 'text-blue-100 hover:bg-blue-900/50 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl opacity-20 blur-md" />
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl" />
              )}
              <div className="relative flex items-center gap-3">
                <IconComponent size={collapsed ? 22 : 20} />
                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
              </div>
>>>>>>> Amira-branch
            </Link>
          );
        })}
      </nav>
<<<<<<< HEAD
      {/* Collapse */}
      <button onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 px-4 py-4 text-blue-300 hover:text-white text-xs border-t border-white/10">
        <ChevronLeftIcon />
        {!collapsed && <span>Collapse Menu</span>}
      </button>
=======

      <div className="p-3 border-t border-blue-800/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-blue-100 hover:text-white hover:bg-blue-900/50 rounded-xl transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="font-medium text-sm">Collapse Menu</span>}
        </button>
      </div>
>>>>>>> Amira-branch
    </aside>
  );
}
