import React from 'react';
import ProImage from '../assets/blank-profile.png';

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  const { first_name, last_name, email, profile } = employee;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right">X</button>
        <div className="text-center">
          <img
            src={profile?.img || ProImage}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{first_name || 'N/A'} {last_name || 'N/A'}</h2>
          <p className="text-gray-600">{email || 'N/A'}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Profile Details</h3>
          <p><strong>Phone Number:</strong> {profile?.phone_number || 'N/A'}</p>
          <p><strong>Job Title:</strong> {profile?.role?.role || 'N/A'}</p>
          <p><strong>Department:</strong> {profile?.department?.department_name || 'N/A'}</p>
          <p><strong>Employee Status:</strong> {profile?.emp_status || 'N/A'}</p>
          <p><strong>Salary:</strong> {profile?.salary ? `$${profile.salary}` : 'N/A'}</p>
          <p><strong>Bonus:</strong> {profile?.bonus ? `$${profile.bonus}` : 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {profile?.birth_date || 'N/A'}</p>
          <p><strong>National ID (NIC):</strong> {profile?.nic || 'N/A'}</p>
          <p><strong>Gender:</strong> {profile?.gender || 'N/A'}</p>
          <h3 className="text-lg font-medium mt-4">Bank Details</h3>
          <p><strong>Bank Name:</strong> {profile?.bank_details?.bank_name || 'N/A'}</p>
          <p><strong>Account Number:</strong> {profile?.bank_details?.account_number || 'N/A'}</p>
          <p><strong>IFSC Code:</strong> {profile?.bank_details?.ifsc_code || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
