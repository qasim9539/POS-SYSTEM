import { useState } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  onMenuToggle: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/products': 'Products',
    '/inventory': 'Inventory',
    '/sales': 'Sales',
    '/reports': 'Reports',
    '/settings': 'Settings',
  }
  return titles[pathname] ?? 'Dashboard'
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const pageTitle = getPageTitle(location.pathname)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate('/signin', { replace: true })
    } finally {
      setIsLoggingOut(false)
      setShowMenu(false)
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
            <NavLink to="/dashboard" className="hover:text-gray-600 transition-colors">Home</NavLink>
            <span>/</span>
            <span className="text-gray-600">{pageTitle}</span>
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-52 pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2.5 pl-2 border-l border-gray-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.fullName) : '??'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-gray-800 leading-tight">
                {user?.fullName ?? 'User'}
              </div>
              <div className="text-[11px] text-gray-400 capitalize">{user?.role ?? 'user'}</div>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
