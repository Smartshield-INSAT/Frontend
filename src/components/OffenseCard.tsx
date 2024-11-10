import React, { useState } from 'react';
import axios from 'axios';
interface Offense {
  id: string;
  description: string;
  eventCount: number;
  flowCount: number;
  magnitude: number;
  updated: string;
  annotation: string;
  server: {
    hostname: string;
  };
}

export default function OffenseCard({ offense }: { offense: Offense }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const BASE_URL = "http://192.168.100.4:8002";

  // Function to fetch and display PDF
  const fetchAndShowPdf = async () => {
    setIsPdfLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/generator/generate-report`, { 
        threat: offense.annotation, 
        threat_data: offense 
      }, {
        timeout: 90000,  // Timeout in milliseconds
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setShowPopup(true);  // Show popup with PDF

    } catch (error) {
      console.error('Error fetching PDF:', error);
      alert('Failed to fetch PDF. Please try again.');
    } finally {
      setIsPdfLoading(false);
    }
  };
  // Function to close the popup and clean up the URL
  const handleClosePopup = () => {
    setShowPopup(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);  // Clean up the object URL
      setPdfUrl(null);
    }
  };

  return (
    <div className="border-b border-gray-700 pb-4 pt-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Offense {offense.id}</span>
        <span className="text-sm text-gray-400">{offense.updated}</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
        <span className="font-medium">{offense.server.hostname}</span>
      </div>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm flex-grow mr-2">
          An offense was detected on server {offense.server.hostname}. For more details, click 'Generate PDF Report'.
        </p>

        <button
          onClick={fetchAndShowPdf}
          disabled={isPdfLoading}
          className="text-xs px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isPdfLoading ? 'Generating PDF...' : 'Generate PDF Report'}
        </button>
      </div>


      <div className="flex justify-between text-sm text-gray-400">
        <span>  </span>
        <div className="flex items-center">
          <span>Attack category: <span className="text-red-400">{offense.annotation}</span></span>
        </div>
      </div>

      {/* Custom popup modal for displaying PDF */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg max-w-3xl w-full relative">
          {/* <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative"> */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                // width="100%"
                width="1000px"
                height="800px"
                title="PDF Report"
                className="rounded-md border"
              />
            ) : (
              <p>Loading PDF...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
