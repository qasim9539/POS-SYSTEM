import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div className="p-8"><h1 className="text-3xl font-bold">POS System Dashboard</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
