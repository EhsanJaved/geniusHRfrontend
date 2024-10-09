import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-10">GENIUS HR</h1>
        <ul>
          <li className="mb-6">
            <a href="#" className="text-blue-500 font-semibold flex items-center">
              <span className="ml-4">Dashboard</span>
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="text-gray-600 flex items-center">
              <span className="ml-4">Message</span>
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="text-gray-600 flex items-center">
              <span className="ml-4">Meeting</span>
            </a>
          </li>
          {/* Add other menu items similarly */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
