import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'

export function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
