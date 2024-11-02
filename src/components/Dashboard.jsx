import React, { useEffect, useRef } from 'react';
import CircularProgressBar from './fregments/Percentage';
import Chart from 'chart.js/auto';
import ActivityFeed from './fregments/ActivityFeed';
import Meetings from './fregments/Meetingfeeds';
import AttendanceChart from './fregments/Attendance';
const Dashboard = () => {
  const chartRef = useRef(null); // Reference for the chart canvas

  const data = [
    { title: 'Total Applications', count: 5672, increase: 75, color: 'bg-green-500' },
    { title: 'Shortlisted Candidates', count: 234, increase: 60, color: 'bg-yellow-500' },
    { title: 'Rejected Candidates', count: 3567, increase: 30, color: 'bg-red-500' },
    { title: 'Candidates In-Review', count: 2145, increase: 50, color: 'bg-blue-500' },
  ];

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Data for the bar chart
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Active Applications',
          data: [1200, 1500, 1000, 2000, 2300, 1800, 2100],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color of the bars
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Options for the bar chart
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Prevent the default behavior of resizing the chart
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create chart instance
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      // Cleanup the chart when the component unmounts
      chartInstance.destroy();
    };
  }, []);

  return (
    <>
    <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Dasboard</h1>
    <div className="p-5">
      {/* Statistics cards */}
      <div className="grid grid-cols-4 gap-6 mb-6 ">
        {data.map((item, index) => (
          <div key={index} className={`p-5 columns-2 rounded-xl shadow-lg text-white w-auto ${item.color}`}>
            <h3>{item.title}</h3>
            <p className="text-2xl my-2 text-black font-bold">{item.count}</p>
            <div className="flex justify-end my-2">
              <CircularProgressBar percentage={item.increase} />
            </div>
          </div>
        ))}
      </div>

      {/* Statistics of Active Applications with Chart.js */}
      <div className="bg-white p-6 rounded shadow-lg mb-6 w-auto">
        <div className="relative h-96 w-full">
          <canvas ref={chartRef} id="activeApplicationsChart" className="w-full h-full "></canvas> {/* Adjust the chart size here */}
        </div>
      </div>

      {/* Recent Added Jobs and Meetings */}
      <div className="flex  gap-4">
          <ActivityFeed/>
          <Meetings/>
          <AttendanceChart/>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
