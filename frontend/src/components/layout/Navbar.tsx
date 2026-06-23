import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
] as const

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 hover:no-underline group"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="w-[38px] h-[38px] rounded-[10px] bg-navy-800 flex items-center justify-center group-hover:bg-navy-hover transition-colors duration-200">
              <svg
                className="w-[18px] h-[18px] text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-extrabold text-navy-800 tracking-tight">
                SmartStock
              </span>
              <span className="text-[11px] text-neutral-400 font-medium mt-0.5">
                Inventory & Sales System
              </span>
            </div>
          </Link>

          {/* Center Nav — desktop with animated underline */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                onClick={(e) => {
                  if (href.startsWith('#')) {
                    e.preventDefault()
                    handleNavClick(href)
                  }
                }}
                className="group relative px-4 py-2 text-[15px] font-medium text-neutral-500 hover:text-navy-800 transition-colors duration-200 hover:no-underline"
              >
                {label}
                {/* Hover-only animated underline */}
                <span className="absolute bottom-0 left-1/2 h-[2px] rounded-full bg-navy-700 transition-all duration-300 ease-out w-0 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons — desktop */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Link
              to="/signin"
              className={cn(
                'px-[18px] py-[9px] text-sm font-semibold',
                'text-navy-800 border border-navy-700/15',
                'rounded-[10px] bg-white',
                'hover:bg-navy-50 hover:border-navy-700/30',
                'transition-all duration-200 hover:no-underline',
              )}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={cn(
                'px-[18px] py-[9px] text-sm font-semibold text-white',
                'bg-navy-800 rounded-[10px]',
                'hover:bg-navy-hover',
                'shadow-sm shadow-navy-800/8',
                'transition-all duration-200 hover:no-underline',
              )}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-neutral-500 hover:text-navy-800 hover:bg-neutral-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-1 pb-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={(e) => {
                    if (href.startsWith('#')) {
                      e.preventDefault()
                      handleNavClick(href)
                    } else {
                      setIsMobileOpen(false)
                    }
                  }}
                  className="px-4 py-3 rounded-lg text-[15px] font-medium text-neutral-700 hover:text-navy-800 hover:bg-neutral-50 transition-all hover:no-underline"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
              <Link
                to="/signin"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-[11px] text-sm font-semibold text-center text-navy-800 rounded-[10px] border border-navy-700/15 bg-white hover:bg-navy-50 transition-all hover:no-underline"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-[11px] text-sm font-semibold text-center text-white bg-navy-800 rounded-[10px] hover:bg-navy-hover transition-all hover:no-underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
