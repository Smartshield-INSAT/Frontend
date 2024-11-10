import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import MetricCard from '../components/MetricCard';
import Navbar from '../components/Navbar';
import UserRow from '../components/UserRow';
import CustomPieChart from '../components/CustomPieChart';
import OffenseCard from '../components/OffenseCard';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home: React.FC = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [nextRefresh, setNextRefresh] = useState(4.55);
  const [activeIndex, setActiveIndex] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const [uniqueIpCount, setUniqueIpCount] = useState(0);
  const [annotationCount, setAnnotationCount] = useState([]);
  const [logsByServerCount, setLogsByServerCount] = useState([]);
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [recentOffenses, setRecentOffenses] = useState([]);
  const [mostRecentOffenseAnnotation, setMostRecentOffenseAnnotation] = useState();
  const [mostReccentOffenseDate, setMostRecentOffenseDate] = useState();
  const [mostRecentOffenseServer, setMostRecentOffenseServer] = useState();
  const [showPopup, setShowPopup] = useState(false);
  
  const [lineChartData, setLineChartData] = useState({
    labels: ['40', '35', '30', '25', '20', '15', '10', '5'],
    datasets: [
      {
        label: 'System Score',
        data: [90000, 80000, 30000, 90000, 50000, 22000, 10000, 104400],
        borderColor: 'rgb(138, 43, 226)',
        backgroundColor: 'rgba(138, 43, 226, 0.5)',
        fill: true,
      },
    ],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Requests',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });
 
  const BASE_URL = 'http://192.168.100.92:3000/';
  // const BASE_URL = 'http://localhost:3000/';
  const COLORS = ['#FF69B4', '#1E90FF', '#20B2AA', '#FFD700', '#FF6347', '#9370DB', '#00FF7F', '#FFA07A', '#00FFFF', '#FF00FF'];
  const MAX_CHAR_ID = 10;
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'number of logs each 5 minutes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120000,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'devices with Most Requests',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const fetchRecent = async () => {
        try {
          const response = await axios.get(`${BASE_URL}api/data/count/last-5-min`);
          const logsCountRecent = response.data
          console.log('Recent logs count:', logsCountRecent);
          const newArray = [...lineChartData.datasets[0].data, logsCountRecent * 100].slice(-8); // Ensure the array has a maximum of 8 items
          setLineChartData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newArray,
              },
            ],
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchRecent();
    }, 14000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [lineChartData.datasets[0].data]);
  useEffect(() => {
    if (mostRecentOffenseAnnotation) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Hide popup after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [mostRecentOffenseAnnotation]);

  useEffect(() => {
    
    const fetchCounts = async () => {
      try {
        const responseDataCountLogs = await axios.get(`${BASE_URL}api/data/count`);
        setLogCount(responseDataCountLogs.data);

        const responseServerCount = await axios.get(`${BASE_URL}api/data/servers/count`);
        setServerCount(responseServerCount.data);

        const responseUniqueIpCount = await axios.get(`${BASE_URL}api/data/unique-ips/count`);
        setUniqueIpCount(responseUniqueIpCount.data);

        const responseAnnotationCount = await axios.get(`${BASE_URL}api/data/count-by-annotation`);
        setAnnotationCount(responseAnnotationCount.data);
        setPieChartData(
          responseAnnotationCount.data
            .filter((annotation: { annotation: string }) => annotation.annotation !== "BENIGN")
            .map((annotation: { annotation: string; count: number }, index: number) => ({
              name: annotation.annotation,
              value: annotation.count,
              color: COLORS[index % COLORS.length],
            }))
        );
        const responseLogsByServerCount = await axios.get(`${BASE_URL}api/data/count-by-server`);
        setLogsByServerCount(responseLogsByServerCount.data);
        // Fetch recent offences
        const recentOffencesResponse = await axios.get(`${BASE_URL}api/data/threats/recent`);
        setRecentOffenses(recentOffencesResponse.data);
        setMostRecentOffenseAnnotation(recentOffencesResponse.data[0].annotation);
        setMostRecentOffenseDate(recentOffencesResponse.data[0].updated);
        setMostRecentOffenseServer(recentOffencesResponse.data[0].server.hostname);        
        const response = await axios.get(`${BASE_URL}api/data/count-by-server-top-5`);
        const data = response.data;

        // Map the server IDs to names and counts to the data array
        const labels = data.map((server: { serverId: string , hostname: string }) =>server.hostname ?server.hostname :  (server.serverId.length > MAX_CHAR_ID ? server.serverId.slice(0, MAX_CHAR_ID) + "..." : server.serverId));
        const counts = data.map((server: { count: number }) => server.count);

        // Check the structure of the transformed data
        console.log('Transformed labels:', labels);
        console.log('Transformed counts:', counts);

        setBarChartData({
          labels,
          datasets: [
            {
              label: 'Number of Requests',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 rounded-md">
      {/* Header */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} nextRefresh={nextRefresh.toString()} />
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-md shadow-lg z-50 animate-fade-in-out">
            <AlertTriangle className="text-yellow-500 w-6 h-6" />
          <p className="font-bold">New Recent Attack detected at { mostReccentOffenseDate } from {mostRecentOffenseServer}:</p>
          <p>Attack Category: {mostRecentOffenseAnnotation}</p>
        </div>
      )}
      
      {/* Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <MetricCard title="Monitored Devices" value={serverCount} />
        <MetricCard title="Number of Logs " value={logCount} subtext="for the past 5 minutes" />
        <MetricCard title="Number of unique ip addresses" value={uniqueIpCount} subtext="for the past 5 minutes" />
        <MetricCard title="latest attack" value={mostRecentOffenseAnnotation}  />
        
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monitored Devices */}
        <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Monitored Devices</h2>
          <div className="space-y-2">
            {logsByServerCount.slice(0, 15).map((user, index) => (
              <UserRow key={index} user={user} all={1} />
            ))}
          </div>
            <button 
            className="mt-4 text-blue-400 hover:underline text-sm"
            onClick={() => window.location.href = '/devices'}
            >
            View all {serverCount} Devices
            </button>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>

          {/* Risk category breakdown */}
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Risk category breakdown</h2>
            <div className="flex items-center justify-between">
              <CustomPieChart pieChartData={pieChartData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
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

          {/*  Bar Chart for Users with Most Requests */}
          <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
            <Bar options={barChartOptions} data={barChartData} />
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