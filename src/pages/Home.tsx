import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import MetricCard from '../components/MetricCard';
import Navbar from '../components/Navbar';
import UserRow from '../components/UserRow';
import CustomPieChart from '../components/CustomPieChart';
import OffenseCard from '../components/OffenseCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home: React.FC = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [nextRefresh, setNextRefresh] = useState(4.55);
  const [activeIndex, setActiveIndex] = useState(0);

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
  ];

  const recentOffenses = [
    {
      id: '#3136',
      user: 'Ray Sharrer',
      description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same devicename containing General Authentication Successful',
      eventCount: 662154,
      flowCount: 0,
      magnitude: 6,
      updated: 'a minute ago'
    },
    {
      id: '#3139',
      user: 'Jay Blue',
      description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same devicename containing AAA user authentication Rejected',
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
  ];

  const lineChartData = {
    labels: ['Dec 4', '6:00', '8:00', 'Dec 5', '3:00', '6:00', '9:00', '12:00'],
    datasets: [
      {
        label: 'System Score',
        data: [200, 400, 600, 800, 1000, 1200, 1000, 800],
        borderColor: 'rgb(138, 43, 226)',
        backgroundColor: 'rgba(138, 43, 226, 0.5)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'System score',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1200,
      },
    },
  };

  const pieChartData = [
    { name: 'User Access', value: 60, color: '#FF69B4' },
    { name: 'User Behavior', value: 15, color: '#1E90FF' },
    { name: 'UBA Machine Learning Anomaly', value: 25, color: '#20B2AA' },
  ];

  

  return (
    
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 rounded-md">
        {/* Header */}
        <Navbar searchQuery= {searchQuery} setSearchQuery={setSearchQuery}  nextRefresh = {nextRefresh.toString()} />

        {/* Metrics */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <MetricCard title="Monitored Devices" value="499" />
          <MetricCard title="High risk Devices" value="0" subtext="0% of monitored Devices" />
          <MetricCard title="Devices discovered from events" value="473" subtext="95% of monitored Devices" />
          <MetricCard title="Devices imported from directory" value="26" subtext="5% of monitored Devices" />
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Active analytics</h3>
            <p className="text-sm">• Rules: 91 of 217</p>
            <p className="text-sm">• Machine learning</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Monitored Devices */}
          <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Monitored Devices</h2>
            <div className="space-y-2">
              {monitoredDevices.map((user, index) => (
                <UserRow key={index} user={user} />
              ))}
            </div>
            <button className="mt-4 text-blue-400 hover:underline text-sm">View all 499 Devices</button>
          </div>

          <div className="col-span-2 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
              <Line options={lineChartOptions} data={lineChartData} />
            </div>

            {/* Risk category breakdown */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Risk category breakdown (Last hour)</h2>
            <div className="flex items-center justify-between">
              <CustomPieChart   pieChartData={pieChartData} activeIndex={activeIndex} setActiveIndex={setActiveIndex}   />
              <div className="space-y-2">
                 {pieChartData.map((entry, index) => (
                   <div key={index} className="flex items-center">
                     <div className="w-4 h-4 mr-2" style={{ backgroundColor: entry.color }}></div>
                     <span>{entry.name}</span>
                   </div>
                 ))}
               </div>
             </div>
            </div> 
          </div>
        </div>

        {/* Recent offenses and System score */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4 px-11">
          <h2 className="text-lg font-semibold mb-4">Recent offenses</h2>
          <div className="space-y-4">
            {recentOffenses.map((offense, index) => (
              <OffenseCard key={index} offense={offense} />
            ))}
          </div>
        </div>

      </div>
  );
}



export default Home;