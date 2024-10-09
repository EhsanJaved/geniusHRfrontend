import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">5672</h2>
          <p>Total Applications</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">234</h2>
          <p>Shortlisted Candidates</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">3567</h2>
          <p>Rejected Candidates</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">2145</h2>
          <p>Candidates In-Review</p>
        </div>
      </div>
      
      {/* Statistics section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Statistics of Active Applications</h2>
        {/* Placeholder for chart, can use a charting library like Chart.js */}
        <div className="h-48 bg-gray-100 rounded">Chart Placeholder</div>
      </div>

      {/* Recent Added Jobs */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Added Jobs</h2>
          <ul>
            <li className="mb-4">
              Jr. Frontend Engineer - Spotify, Singapore
            </li>
            <li className="mb-4">
              Product Designer - Spotify, Singapore
            </li>
            <li className="mb-4">
              iOS Developer - San Francisco, CA
            </li>
            <li>
              Brand Strategist - New York, US
            </li>
          </ul>
        </div>

        {/* Meetings Section */}
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
