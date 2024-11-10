import React, { useEffect, useState } from 'react';
import OffenseCard from '../components/OffenseCard';
import axios from 'axios';

const Offenses: React.FC = () => {
  const [allOffenses, setAllOffenses] = useState([]);
  const [displayedOffenses, setDisplayedOffenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const BASE_URL = 'http://192.168.100.92:3000/';
  // const BASE_URL = 'http://localhost:3000/';


  useEffect(() => {
    const fetchOffenses = async () => {
      try {
        // Fetch recent offenses
        const recentOffensesResponse = await axios.get(`${BASE_URL}api/data/threats`);
        console.log(recentOffensesResponse);

        setAllOffenses(recentOffensesResponse.data);
      } catch (error) {
        console.error('Error fetching offenses:', error);
      }
    };
    fetchOffenses();
  }, [BASE_URL]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedOffenses(allOffenses.slice(indexOfFirstItem, indexOfLastItem));
  }, [allOffenses, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(allOffenses.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-2 px-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">All offenses</h2>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 px-11">
        <div className="space-y-4">
          {displayedOffenses.map((offense, index) => (
            <OffenseCard key={index} offense={offense} />
          ))}
        </div>
        <div className="mt-11 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
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
};

export default Offenses;
