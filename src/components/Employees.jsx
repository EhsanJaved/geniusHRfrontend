import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaPen } from 'react-icons/fa';
import EmployeeModal from './EmployeeModal';
import ProImage from '../assets/blank-profile.png';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 8;
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/emp/users/', {
          headers: { Authorization: `Token ${token}` },
        });
        setEmployees(response.data);
        console.log(`Token ${token}`);
        
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  // Pagination calculations
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <h1 className="text-3xl font-bold pl-8 pb-4">Employees</h1>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Employee</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Job Title</th>
                <th className="py-3 px-6 text-left">Cell Number</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <img
                      src={employee.profile?.img || ProImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">{employee.first_name || 'N/A'} {employee.last_name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{employee.email}</td>
                  <td className="py-3 px-6 text-left">{employee.profile?.role?.role || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{employee.profile?.phone_number || 'N/A'}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleViewDetails(employee)} className="mr-4">
                      <FaEye />
                    </button>
                    <button onClick={() => console.log(`Editing employee ID: ${employee.id}`)}>
                      <FaPen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4 bg-white">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'} hover:bg-gray-200 rounded`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'} hover:bg-gray-200 rounded`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedEmployee && <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
    </>
  );
};

export default Employees;
