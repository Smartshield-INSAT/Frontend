import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/DashboardLayout.tsx';
import Home from './pages/Home.tsx';
import Offenses from './pages/Offenses.tsx';
import Users from './pages/Users.tsx';
import Settings from './pages/Settings.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="offenses" element={<Offenses />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;