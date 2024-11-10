import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserRow from '../components/UserRow';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';

export default function Devices() {
  const [logsByDeviceCount, setLogsByDeviceCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = 'http://192.168.100.92:3000/';
  // const BASE_URL = 'http://localhost:3000/';

useEffect(() => {
    async function fetchData() {
    try {
      
      const responseLogsByDeviceCount = await axios.get(`${BASE_URL}api/data/count-by-server`);
        setLogsByDeviceCount(responseLogsByDeviceCount.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, []);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevices = logsByDeviceCount.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(logsByDeviceCount.length / itemsPerPage);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='p-4 rounded-lg text-gray-100'>
      {/* Monitored Devices */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monitored Devices</h2>
        <Link
          to="/Devices/adddevice"
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Device
        </Link>
      </div>
      <div className="col-span-1 bg-gray-800 p-4 rounded-lg text-gray-100">
        <div className="space-y-2">
          {currentDevices.map((user, index) => (
            <UserRow key={index} user={user} all={0} />
          ))}
        </div>
        <div className="mt-11 flex justify-center items-center space-x-4">
          <button 
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}