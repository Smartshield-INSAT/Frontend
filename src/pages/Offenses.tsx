import React, { useState } from 'react';
import OffenseCard from '../components/OffenseCard';

const Offenses: React.FC = () => {
    const recentOffenses = [
        {
          id: '#3136',
          user: 'Ray Sharrer',
          description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing General Authentication Successful',
          eventCount: 662154,
          flowCount: 0,
          magnitude: 6,
          updated: 'a minute ago'
        },
        {
          id: '#3139',
          user: 'Jay Blue',
          description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing AAA user authentication Rejected',
          eventCount: 801765,
          flowCount: 0,
          magnitude: 6,
          updated: 'a minute ago'
        },
        {
          id: '#3174',
          user: 'Ray Sharrer',
          description: 'UBA Offense - User crossed risk threshold',
          eventCount: 8,
          flowCount: 0,
          magnitude: 3,
          updated: 'a day ago'
        },
        {
          id: '#3139',
          user: 'Jay Blue',
          description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing AAA user authentication Rejected',
          eventCount: 801765,
          flowCount: 0,
          magnitude: 6,
          updated: 'a minute ago'
        },
        {
          id: '#3174',
          user: 'Ray Sharrer',
          description: 'UBA Offense - User crossed risk threshold',
          eventCount: 8,
          flowCount: 0,
          magnitude: 3,
          updated: 'a day ago'
        },
        {
          id: '#3139',
          user: 'Jay Blue',
          description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing AAA user authentication Rejected',
          eventCount: 801765,
          flowCount: 0,
          magnitude: 6,
          updated: 'a minute ago'
        },
        {
          id: '#3174',
          user: 'Ray Sharrer',
          description: 'UBA Offense - User crossed risk threshold',
          eventCount: 8,
          flowCount: 0,
          magnitude: 3,
          updated: 'a day ago'
        },
        {
          id: '#3174',
          user: 'Ray Sharrer',
          description: 'UBA Offense - User crossed risk threshold',
          eventCount: 8,
          flowCount: 0,
          magnitude: 3,
          updated: 'a day ago'
        },
        {
          id: '#3174',
          user: 'Ray Sharrer',
          description: 'UBA Offense - User crossed risk threshold',
          eventCount: 8,
          flowCount: 0,
          magnitude: 3,
          updated: 'a day ago'
        }
    ];
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOffenses = recentOffenses.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(recentOffenses.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg mt-2 px-4 text-gray-100">
            <h2 className="text-xl font-semibold mb-4">All offenses</h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4 px-11">
                <div className="space-y-4">
                    {currentOffenses.map((offense, index) => (
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

