// EmployeeCard.js
import React from 'react';

const EmployeeCard = ({ employee, onViewDetails }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
      <div className="flex-shrink-0">
        <img src={employee.image} alt={employee.name} className="w-16 h-16 rounded-full object-cover" />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{employee.username}</h3>
        <p className="text-sm text-gray-500">ID: {employee.id}</p>
        <p className="text-sm text-gray-500">{employee.role}</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">{employee.attendance}%</p>
        <p className="text-sm text-gray-500">Attendance</p>
      </div>
      <button
        onClick={() => onViewDetails(employee.id)}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  );
};

export default EmployeeCard;
