import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Box,
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  badge?: string
  badgeColor?: string
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Products', path: '/products', icon: <Package size={18} /> },
  { label: 'Inventory', path: '/inventory', icon: <Warehouse size={18} /> },
  { label: 'Sales', path: '/sales', icon: <ShoppingCart size={18} /> },
  { label: 'Reports', path: '/reports', icon: <BarChart3 size={18} /> },
  { label: 'Alerts', path: '/dashboard', icon: <Bell size={18} />, badge: '12', badgeColor: 'bg-red-500' },
]

const bottomNav: NavItem[] = [
  { label: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  { label: 'Help', path: '/dashboard', icon: <HelpCircle size={18} /> },
]

interface SidebarProps {
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-navy-900 text-white transition-transform duration-300 lg:static lg:translate-x-0',
          collapsed ? 'w-[72px]' : 'w-[260px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button
          onClick={onMobileClose}
          className="absolute top-3 right-3 lg:hidden p-1 rounded-md hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className={cn('flex items-center gap-3 px-5 pt-6 pb-8', collapsed && 'justify-center px-0')}>
          <div className="w-9 h-9 rounded-lg bg-[#1E40AF] flex items-center justify-center flex-shrink-0">
            <Box size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold tracking-tight text-white">StockIQ</span>
              <span className="block text-[10px] text-blue-300/60 font-medium uppercase tracking-[0.15em] mt-[-2px]">
                Dashboard
              </span>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="px-5 mb-3">
            <span className="text-[11px] font-semibold text-blue-300/50 uppercase tracking-[0.2em]">
              Main Menu
            </span>
          </div>
        )}

        <nav className="flex-1 px-3 space-y-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:no-underline',
                  collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5',
                )
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-bold text-white min-w-[20px] text-center',
                  item.badgeColor || 'bg-gray-500',
                )}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-4 mt-2">
          {bottomNav.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:no-underline',
                  collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5',
                )
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-white/10 text-blue-300/50 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  )
}
