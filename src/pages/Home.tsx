import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import MetricCard from '../components/MetricCard';
import Navbar from '../components/Navbar';
import UserRow from '../components/UserRow';
import CustomPieChart from '../components/CustomPieChart';
import OffenseCard from '../components/OffenseCard';
import axios from 'axios';

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
  const [logsByIpCount, setLogsByIpCount] = useState([]);
  const [logsByServerCount, setLogsByServerCount] = useState([]);
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [recentOffenses, setRecentOffenses] = useState([]);
  const [top5Servers, setTop5Servers] = useState([]);
  const [barChartData, setBarChartData] = useState({});
 
  const BASE_URL = 'http://192.168.100.92:3000/';
  const COLORS = ['#FF69B4', '#1E90FF', '#20B2AA', '#FFD700', '#FF6347', '#9370DB', '#00FF7F', '#FFA07A', '#00FFFF', '#FF00FF'];

  


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



  // // New data for the bar chart
  // const userRequestsData = {
  //   labels: ['Ray Sharrer', 'Jay Blue', 'Administrator', 'Katie Wilson', 'Jack Eastwood'],
  //   datasets: [
  //     {
  //       label: 'Number of Requests',
  //       data: [662162, 801765, 75640, 600, 260],
  //       backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

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
        
        

        // const responseLogsByIpCount = await axios.get(`${BASE_URL}api/data/count-by-id`);
        // setLogsByIpCount(responseLogsByIpCount.data);

        const responseLogsByServerCount = await axios.get(`${BASE_URL}api/data/count-by-server`);
        setLogsByServerCount(responseLogsByServerCount.data);

        // // Fetch all offences
        // const allOffences = await axios.get(`${BASE_URL}api/threats`);
        // setLogsByServerCount(allOffences.data);

        // Fetch recent offences
        const recentOffencesResponse = await axios.get(`${BASE_URL}api/data/threats/recent`);
        console.log(recentOffencesResponse);

        setRecentOffenses(recentOffencesResponse.data);

        // Fetch count of logs for the last 5 minutes
        // const logsCount = await axios.get(`${BASE_URL}api/count/last-5-min`);
        // setLogCount(logsCount.data);

        // // Fetch count for each server's logs in the last 5 minutes
        // const serverLogs = await axios.get(`${BASE_URL}api/servers/count/last-5-min`);
        // setServerCount(serverLogs.data);

        // // Fetch count of unique IP addresses in the last 5 minutes
        // const uniqueIps = await axios.get(`${BASE_URL}api/unique-ips/count/last-5-min`);
        // setUniqueIpCount(uniqueIps.data);

        // Fetch logs count by annotation in the last 5 minutes
        // const annotations = await axios.get(`${BASE_URL}api/count-by-annotation/last-5-min`);
        // setAnnotationCount(annotations.data);
        // setPieChartData(
        //   annotations.data
        //     .map((annotation, index) => ({
        //       name: annotation.annotation,
        //       value: annotation.count,
        //       color: COLORS[index % COLORS.length],
        //     }))
        // );

        // // Fetch logs count by ID in the last 5 minutes
        // const logsById = await axios.get(`${BASE_URL}api/count-by-id/last-5-min`);
        // setLogsByIpCount(logsById.data);

        // Fetch top 5 servers by log count in the last 5 minutes
        const top5Ips = await axios.get(`${BASE_URL}api/count-by-ip-top-5/last-5-min`);
        setTop5Servers(top5Ips.data);
        setBarChartData({
          labels: top5Ips.data.map((ip: { ip: string }) => ip.ip),
          datasets: [
            {
              label: 'Number of logs',
              data: top5Ips.data.map((ip: { count: number }) => ip.count),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });


        // // Fetch logs count by server in the last 5 minutes
        // const logsByServer = await axios.get(`${BASE_URL}api/count-by-server/last-5-min`);
        // setLogsByServerCount(logsByServer.data);

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

      {/* Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <MetricCard title="Monitored Devices" value={serverCount} />
        <MetricCard title="Number of Logs " value={logCount} subtext="for the past 5 minutes" />
        <MetricCard title="Number of unique ip addresses" value={uniqueIpCount} subtext="for the past 5 minutes" />
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
            {logsByServerCount.map((user, index) => (
              <UserRow key={index} user={user} />
            ))}
            {/* {monitoredDevices.map((user, index) => (
              <UserRow key={index} user={user} />
            ))} */}
          </div>
          {/* <button className="mt-4 text-blue-400 hover:underline text-sm">View all 499 Devices</button> */}
        </div>

        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>

          {/* Risk category breakdown */}
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Risk category breakdown (Last hour)</h2>
            <div className="flex items-center justify-between">
              {/* <CustomPieChart pieChartData={pieChartData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} /> */}
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

          {/* New Bar Chart for Users with Most Requests */}
          <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
            {/* <Bar options={barChartOptions} data={barChartData} /> */}
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