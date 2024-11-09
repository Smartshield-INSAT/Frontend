import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, Users, Settings, ChevronLeft, ChevronRight, BarChart2  } from 'lucide-react';

const CollapsibleSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart2 , label: 'Detailed Analysis', path: '/DetailedAnalysis' },
    { icon: AlertCircle, label: 'All Offenses', path: '/offenses' },
    { icon: Users, label: 'Monitored Devices', path: '/Devices' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 focus:outline-none"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CollapsibleSidebar;