import { Routes, Route } from 'react-router-dom';
import SettingsPage from './features/settings/SettingsPage';
import AlertCenter from './features/AlertCenter/AlertCenter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/alerts" element={<AlertCenter />} />
    </Routes>
  );
}

export default App;