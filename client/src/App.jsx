import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SalesPage from './features/sales/SalesPage.jsx'
import ReportsPage from './features/reports/ReportsPage.jsx'
import InventoryPage from './features/inventory/InventoryPage.jsx'
import HelpPage from './features/help/HelpPage.jsx'
import ProductsPage from './features/products/ProductsPage.jsx'
import SettingsPage from './features/settings/SettingsPage.jsx'
import AlertCenter from './features/AlertCenter/AlertCenter.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/alerts" element={<AlertCenter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
