import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AttendanceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: Array.from({ length: 20 }, (_, i) => `Aug ${i + 1}`), // Aug 1 to Aug 20
      datasets: [
        {
          label: 'Present On Time',
          data: [2, 3, 8, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Present - Late Entry',
          data: [0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 19],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
          label: 'Govt Holiday',
          data: [0, 0, 0, 4, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 18, 0, 0, 25],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
          label: 'Absent',
          data: [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center my-4">Attendance Chart</h3>
      <div className="">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AttendanceChart;
