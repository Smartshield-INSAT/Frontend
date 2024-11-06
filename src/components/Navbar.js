import React from "react";
import { Search, Settings, RefreshCw, Users, Filter, ChevronDown, Volume2 } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  nextRefresh: string;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, nextRefresh }) => {
    return (
        <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="relative">
            <select className="appearance-none bg-gray-800 border border-gray-700 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500">
              <option>All users</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <Filter className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for users"
              className="w-80 rounded-md bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <RefreshCw className="h-4 w-4" />
            <span>Next refresh: {nextRefresh}</span>
          </div>
          <button className="text-gray-400 hover:text-white">Reset layout</button>
          <Settings className="h-5 w-5 text-gray-400" />
          <Users className="h-5 w-5 text-gray-400" />
          <Filter className="h-5 w-5 text-gray-400" />
        </div>
      </header>
    );
    }

export default Navbar;