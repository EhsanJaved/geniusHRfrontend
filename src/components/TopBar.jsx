import React from 'react';

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-100">
      <div>
        <h1 className="text-xl font-bold">Welcome back, Ehsan Javed 🌟</h1>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-gray-600">Ehsan Javed | HR Admin</span>
        <img
          src="https://randomuser.me/api/portraits/men/41.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default TopBar;
