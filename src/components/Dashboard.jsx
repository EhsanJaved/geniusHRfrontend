import React from 'react';
import { Line } from 'charts';
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
import CircularProgressBar from './fregments/Percentage';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = [
    { title: 'Total Applications', count: 5672, increase: 75, color: 'bg-green-500' },
    { title: 'Shortlisted Candidates', count: 234, increase: 60, color: 'bg-yellow-500' },
    { title: 'Rejected Candidates', count: 3567, increase: 30, color: 'bg-red-500' },
    { title: 'Candidates In-Review', count: 2145, increase: 50, color: 'bg-blue-500' },
  ];

  // Chart.js data and options
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Active Applications',
        data: [3000, 4000, 3200, 4500, 5000, 5672],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active Applications Over Time',
      },
    },
  };

  return (
    <div className="p-5">
      {/* Statistics cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {data.map((item, index) => (
          <div key={index} className={`p-5 columns-2 rounded-xl text-white w-auto ${item.color}`}>
            <h3>{item.title}</h3>
            <p className="text-2xl my-2 text-black font-bold">{item.count}</p>
            <div className="flex justify-end my-2">
              <CircularProgressBar percentage={item.increase} />
            </div>
          </div>
        ))}
      </div>

      {/* Statistics of Active Applications with Chart.js */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Statistics of Active Applications</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Recent Added Jobs and Meetings */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Added Jobs</h2>
          <ul>
            <li className="mb-4">Jr. Frontend Engineer - Spotify, Singapore</li>
            <li className="mb-4">Product Designer - Spotify, Singapore</li>
            <li className="mb-4">iOS Developer - San Francisco, CA</li>
            <li>Brand Strategist - New York, US</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Meetings</h2>
          <ul>
            <li className="mb-4">Interview - 9:00 am - 11:30 am</li>
            <li className="mb-4">Organizational Meeting - 9:00 am - 11:30 am</li>
            <li>Meeting with Manager - 9:00 am - 11:30 am</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
