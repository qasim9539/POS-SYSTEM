import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { GuestRoute } from '@/components/auth/GuestRoute'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Home } from '@/pages/Home'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'
import { Dashboard } from '@/pages/dashboard/Dashboard'
import { PlaceholderPage } from '@/pages/dashboard/PlaceholderPage'
import { NotFound } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/signin',
    element: (
      <GuestRoute>
        <SignIn />
      </GuestRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <GuestRoute>
        <SignUp />
      </GuestRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      {
        path: '/products',
        element: (
          <PlaceholderPage
            title="Products"
            description="Manage your product catalog, pricing, and variants."
          />
        ),
      },
      {
        path: '/inventory',
        element: (
          <PlaceholderPage
            title="Inventory"
            description="Track stock levels, warehouses, and inventory movements."
          />
        ),
      },
      {
        path: '/sales',
        element: (
          <PlaceholderPage
            title="Sales"
            description="View and manage sales orders and transactions."
          />
        ),
      },
      {
        path: '/reports',
        element: (
          <PlaceholderPage
            title="Reports"
            description="Analyze business performance with detailed reports."
          />
        ),
      },
      {
        path: '/settings',
        element: (
          <PlaceholderPage
            title="Settings"
            description="Configure your account and application preferences."
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Layout />,
    children: [
      { path: '*', element: <NotFound /> },
    ],
  },
])
