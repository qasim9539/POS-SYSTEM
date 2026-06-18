import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import SettingsPage from './features/settings/SettingsPage';
import AlertCenter from './features/AlertCenter/AlertCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">POS System Dashboard</h1></div>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/alerts" element={<AlertCenter />} />
      </Routes>
    </Router>
  );
}

export default App;