import React from 'react';
import { Outlet } from 'react-router-dom';
import CollapsibleSidebar from './CollapsibleSidebar.tsx';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CollapsibleSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;