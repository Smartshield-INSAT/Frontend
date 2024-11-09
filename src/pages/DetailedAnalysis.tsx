import React, { useState } from 'react';
import KibanaEmbed from '../components/KibanaEmbed';
const DetailedAnalysis: React.FC = () => {
    
 
    return (
        <div className="bg-gray-900 p-4 rounded-lg mt-2 px-4 text-gray-100">
            <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
            <KibanaEmbed />
        </div>
    );
        
};

export default DetailedAnalysis;

