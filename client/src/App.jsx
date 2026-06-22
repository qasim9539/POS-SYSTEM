import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SalesPage from './features/sales/SalesPage.jsx'
import ReportsPage from './features/reports/ReportsPage.jsx'
import InventoryPage from './features/inventory/InventoryPage.jsx'
import HelpPage from './features/help/HelpPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
