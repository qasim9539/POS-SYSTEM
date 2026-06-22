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
            </Link>
          );
        })}
      </nav>

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
    </aside>
  );
}
