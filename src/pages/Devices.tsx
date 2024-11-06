import React, { useState } from 'react';
import UserRow from '../components/UserRow';

const Devices: React.FC = () => {
  const monitoredDevices = [
    { devicename: 'Ray Sharrer', role: 'Sales Lead from Singapore', recentRisk: 15, overallRisk: 539.6, isHighRisk: true },
    { devicename: 'Jay Blue', role: 'Programmer from Colorado', recentRisk: 5, overallRisk: 526.6, isHighRisk: true },
    { devicename: 'Administrator', role: 'Administrator from New Y...', recentRisk: 0, overallRisk: 75.64, isHighRisk: false },
    { devicename: 'Katie Wilson', role: 'Scientist from Austin', recentRisk: 0, overallRisk: 0.6, isHighRisk: false },
    { devicename: 'KANZLEI\\Pierro', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'DESKTOP-9SR1FC...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'NT AUTHORITY\\S...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'Jack Eastwood', role: 'IT Manager from Seattle', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'INTERCOMPANY1\\...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'MANJU\\alice', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'Ray Sharrer', role: 'Sales Lead from Singapore', recentRisk: 15, overallRisk: 539.6, isHighRisk: true },
    { devicename: 'Jay Blue', role: 'Programmer from Colorado', recentRisk: 5, overallRisk: 526.6, isHighRisk: true },
    { devicename: 'Administrator', role: 'Administrator from New Y...', recentRisk: 0, overallRisk: 75.64, isHighRisk: false },
    { devicename: 'Katie Wilson', role: 'Scientist from Austin', recentRisk: 0, overallRisk: 0.6, isHighRisk: false },
    { devicename: 'KANZLEI\\Pierro', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'DESKTOP-9SR1FC...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'NT AUTHORITY\\S...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'Jack Eastwood', role: 'IT Manager from Seattle', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'INTERCOMPANY1\\...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { devicename: 'MANJU\\alice', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevices = monitoredDevices.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(monitoredDevices.length / itemsPerPage);

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
      <h2 className="text-xl font-semibold mb-4">Monitored Devices</h2>
      <div className="col-span-1 bg-gray-800 p-4 rounded-lg text-gray-100">
        <div className="space-y-2">
          {currentDevices.map((user, index) => (
            <UserRow key={index} user={user} />
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
};

export default Devices;














// import React from 'react';
// import UserRow from '../components/UserRow';

// const Devices: React.FC = () => {
//   const monitoredDevices = [
//     { devicename: 'Ray Sharrer', role: 'Sales Lead from Singapore', recentRisk: 15, overallRisk: 539.6, isHighRisk: true },
//     { devicename: 'Jay Blue', role: 'Programmer from Colorado', recentRisk: 5, overallRisk: 526.6, isHighRisk: true },
//     { devicename: 'Administrator', role: 'Administrator from New Y...', recentRisk: 0, overallRisk: 75.64, isHighRisk: false },
//     { devicename: 'Katie Wilson', role: 'Scientist from Austin', recentRisk: 0, overallRisk: 0.6, isHighRisk: false },
//     { devicename: 'KANZLEI\\Pierro', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { devicename: 'DESKTOP-9SR1FC...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { devicename: 'NT AUTHORITY\\S...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { devicename: 'Jack Eastwood', role: 'IT Manager from Seattle', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { devicename: 'INTERCOMPANY1\\...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { devicename: 'MANJU\\alice', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//   ];
//   return (
//     <div className=' p-4 rounded-lg text-gray-100'>
//       {/* Monitored Devices */}
//       <h2 className="text-lg font-semibold mb-4">Monitored Devices</h2>
//       <div className="col-span-1 bg-gray-800 p-4 rounded-lg text-gray-100">
//         <div className="space-y-2">
//           {monitoredDevices.map((user, index) => (
//             <UserRow key={index} user={user} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Devices;