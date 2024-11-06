import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/DashboardLayout';
import Home from './pages/Home';
import Offenses from './pages/Offenses';
import Devices from './pages/Devices';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="offenses" element={<Offenses />} />
          <Route path="Devices" element={<Devices />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;