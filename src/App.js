import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import MetricCard from './components/MetricCard';
import Navbar from './components/Navbar'
import UserRow from './components/UserRow'
import CustomPieChart from './components/CustomPieChart';
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

export default function EnhancedSecurityDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [nextRefresh, setNextRefresh] = useState(4.55);
  const [activeIndex, setActiveIndex] = useState(0);

  const monitoredUsers = [
    { username: 'Ray Sharrer', role: 'Sales Lead from Singapore', recentRisk: 15, overallRisk: 539.6, isHighRisk: true },
    { username: 'Jay Blue', role: 'Programmer from Colorado', recentRisk: 5, overallRisk: 526.6, isHighRisk: true },
    { username: 'Administrator', role: 'Administrator from New Y...', recentRisk: 0, overallRisk: 75.64, isHighRisk: false },
    { username: 'Katie Wilson', role: 'Scientist from Austin', recentRisk: 0, overallRisk: 0.6, isHighRisk: false },
    { username: 'KANZLEI\\Pierro', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { username: 'DESKTOP-9SR1FC...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { username: 'NT AUTHORITY\\S...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { username: 'Jack Eastwood', role: 'IT Manager from Seattle', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { username: 'INTERCOMPANY1\\...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
    { username: 'MANJU\\alice', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
  ];

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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* Header */}
      <Navbar searchQuery= {searchQuery} setSearchQuery={setSearchQuery}  nextRefresh = {nextRefresh} />

      {/* Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <MetricCard title="Monitored users" value="499" />
        <MetricCard title="High risk users" value="0" subtext="0% of monitored users" />
        <MetricCard title="Users discovered from events" value="473" subtext="95% of monitored users" />
        <MetricCard title="Users imported from directory" value="26" subtext="5% of monitored users" />
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-2">Active analytics</h3>
          <p className="text-sm">• Rules: 91 of 217</p>
          <p className="text-sm">• Machine learning</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monitored users */}
        <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Monitored users</h2>
          <div className="space-y-2">
            {monitoredUsers.map((user, index) => (
              <UserRow key={index} user={user} />
            ))}
          </div>
          <button className="mt-4 text-blue-400 hover:underline text-sm">View all 499 users</button>
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





function OffenseCard({ offense }) {
  return (
    <div className="border-t border-gray-700 pt-4">
      <div className="flex  justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Offense {offense.id}</span>
        <span className="text-sm text-gray-400">{offense.updated}</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
        <span className="font-medium">{offense.user}</span>
      </div>
      <p className="text-sm mb-2">{offense.description}</p>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Event count: {offense.eventCount}</span>
        <span>Flow count: {offense.flowCount}</span>
        <div className="flex items-center">
          <span className="mr-2">Magnitude: {offense.magnitude}/10</span>
          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${(offense.magnitude / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}























































// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
// import { Search, Settings, RefreshCw, Users, Filter, ChevronDown, Volume2 } from 'lucide-react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function EnhancedSecurityDashboard() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [nextRefresh, setNextRefresh] = useState(4.55);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const monitoredUsers = [
//     { username: 'Ray Sharrer', role: 'Sales Lead from Singapore', recentRisk: 15, overallRisk: 539.6, isHighRisk: true },
//     { username: 'Jay Blue', role: 'Programmer from Colorado', recentRisk: 5, overallRisk: 526.6, isHighRisk: true },
//     { username: 'Administrator', role: 'Administrator from New Y...', recentRisk: 0, overallRisk: 75.64, isHighRisk: false },
//     { username: 'Katie Wilson', role: 'Scientist from Austin', recentRisk: 0, overallRisk: 0.6, isHighRisk: false },
//     { username: 'KANZLEI\\Pierro', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { username: 'DESKTOP-9SR1FC...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { username: 'NT AUTHORITY\\S...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { username: 'Jack Eastwood', role: 'IT Manager from Seattle', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { username: 'INTERCOMPANY1\\...', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//     { username: 'MANJU\\alice', role: '', recentRisk: 0, overallRisk: 0.26, isHighRisk: false },
//   ];

//   const recentOffenses = [
//     {
//       id: '#3136',
//       user: 'Ray Sharrer',
//       description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing General Authentication Successful',
//       eventCount: 662154,
//       flowCount: 0,
//       magnitude: 6,
//       updated: 'a minute ago'
//     },
//     {
//       id: '#3139',
//       user: 'Jay Blue',
//       description: 'Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing AAA user authentication Rejected',
//       eventCount: 801765,
//       flowCount: 0,
//       magnitude: 6,
//       updated: 'a minute ago'
//     },
//     {
//       id: '#3174',
//       user: 'Ray Sharrer',
//       description: 'UBA Offense - User crossed risk threshold',
//       eventCount: 8,
//       flowCount: 0,
//       magnitude: 3,
//       updated: 'a day ago'
//     },
//   ];

//   const lineChartData = {
//     labels: ['Dec 4', '6:00', '8:00', 'Dec 5', '3:00', '6:00', '9:00', '12:00'],
//     datasets: [
//       {
//         label: 'System Score',
//         data: [200, 400, 600, 800, 1000, 1200, 1000, 800],
//         borderColor: 'rgb(138, 43, 226)',
//         backgroundColor: 'rgba(138, 43, 226, 0.5)',
//         fill: true,
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'System score',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 1200,
//       },
//     },
//   };

//   const pieChartData = [
//     { name: 'User Access', value: 60, color: '#FF69B4' },
//     { name: 'User Behavior', value: 15, color: '#1E90FF' },
//     { name: 'UBA Machine Learning Anomaly', value: 25, color: '#20B2AA' },
//   ];

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   const renderActiveShape = (props) => {
//     const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//     const RADIAN = Math.PI / 180;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? 'start' : 'end';

//     return (
//       <g>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 6}
//           outerRadius={outerRadius + 10}
//           fill={fill}
//         />
//         <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//         <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//         <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>
//           {payload.name}
//         </text>
//         <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`Value ${value}`}</text>
//         <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999">
//           {`(Rate ${(percent * 100).toFixed(2)}%) `}
//         </text>
//       </g>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
//       {/* Header */}
//       <header className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-2xl font-bold">Overview</h1>
//           <div className="relative">
//             <select className="appearance-none bg-gray-800 border border-gray-700 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500">
//               <option>All users</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//               <ChevronDown className="h-4 w-4" />
//             </div>
//           </div>
//           <Filter className="h-5 w-5 text-gray-400" />
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search for users"
//               className="w-80 rounded-md bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center space-x-2 text-sm text-gray-400">
//             <RefreshCw className="h-4 w-4" />
//             <span>Next refresh: {nextRefresh}</span>
//           </div>
//           <button className="text-gray-400 hover:text-white">Reset layout</button>
//           <Settings className="h-5 w-5 text-gray-400" />
//           <Users className="h-5 w-5 text-gray-400" />
//           <Filter className="h-5 w-5 text-gray-400" />
//         </div>
//       </header>

//       {/* Metrics */}
//       <div className="grid grid-cols-5 gap-4 mb-6">
//         <MetricCard title="Monitored users" value="499" />
//         <MetricCard title="High risk users" value="0" subtext="0% of monitored users" />
//         <MetricCard title="Users discovered from events" value="473" subtext="95% of monitored users" />
//         <MetricCard title="Users imported from directory" value="26" subtext="5% of monitored users" />
//         <div className="bg-gray-800 p-4 rounded-lg">
//           <h3 className="text-sm text-gray-400 mb-2">Active analytics</h3>
//           <p className="text-sm">• Rules: 91 of 217</p>
//           <p className="text-sm">• Machine learning</p>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="grid grid-cols-3 gap-4">
//         {/* Monitored users */}
//         <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
//           <h2 className="text-lg font-semibold mb-4">Monitored users</h2>
//           <div className="space-y-2">
//             {monitoredUsers.map((user, index) => (
//               <UserRow key={index} user={user} />
//             ))}
//           </div>
//           <button className="mt-4 text-blue-400 hover:underline text-sm">View all 499 users</button>
//         </div>

//         {/* Recent offenses and System score */}
//         <div className="col-span-2 space-y-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h2 className="text-lg font-semibold mb-4">Recent offenses</h2>
//             <div className="space-y-4">
//               {recentOffenses.map((offense, index) => (
//                 <OffenseCard key={index} offense={offense} />
//               ))}
//             </div>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg h-[300px] w-full">
//             <Line options={lineChartOptions} data={lineChartData} />
//           </div>
//         </div>
//       </div>

//       {/* Risk category breakdown */}
//       <div className="mt-6 bg-gray-800 p-4 rounded-lg">
//         <h2 className="text-lg font-semibold mb-4">Risk category breakdown (Last hour)</h2>
//         <div className="flex items-center justify-between">
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 activeIndex={activeIndex}
//                 activeShape={renderActiveShape}
//                 data={pieChartData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 onMouseEnter={onPieEnter}
//               >
//                 {pieChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="space-y-2">
//              {pieChartData.map((entry, index) => (
//                <div key={index} className="flex items-center">
//                  <div className="w-4 h-4 mr-2" style={{ backgroundColor: entry.color }}></div>
//                  <span>{entry.name}</span>
//                </div>
//              ))}
//            </div>
//          </div>
        
//       </div>
//     </div>
//   );
// }

// function MetricCard({ title, value, subtext }) {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
//       <p className="text-3xl font-bold">{value}</p>
//       {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
//     </div>
//   );
// }

// function UserRow({ user }) {
//   return (
//     <div className="flex items-center justify-between py-2 border-b border-gray-700">
//       <div>
//         <div className="flex items-center">
//           {user.isHighRisk && <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />}
//           <span className="font-medium">{user.username}</span>
//         </div>
//         <p className="text-sm text-gray-400">{user.role}</p>
//       </div>
//       <div className="flex items-center space-x-4">
//         <span className="text-sm">{user.recentRisk}</span>
//         <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-blue-500 rounded-full"
//             style={{ width: `${(user.overallRisk / 600) * 100}%` }}
//           />
//         </div>
//         <span className="text-sm">{user.overallRisk}</span>
//       </div>
//     </div>
//   );
// }

// function OffenseCard({ offense }) {
//   return (
//     <div className="border-t border-gray-700 pt-4">
//       <div className="flex  justify-between items-center mb-2">
//         <span className="text-sm text-gray-400">Offense {offense.id}</span>
//         <span className="text-sm text-gray-400">{offense.updated}</span>
//       </div>
//       <div className="flex items-center mb-2">
//         <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
//         <span className="font-medium">{offense.user}</span>
//       </div>
//       <p className="text-sm mb-2">{offense.description}</p>
//       <div className="flex justify-between text-sm text-gray-400">
//         <span>Event count: {offense.eventCount}</span>
//         <span>Flow count: {offense.flowCount}</span>
//         <div className="flex items-center">
//           <span className="mr-2">Magnitude: {offense.magnitude}/10</span>
//           <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-red-500 rounded-full"
//               style={{ width: `${(offense.magnitude / 10) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }