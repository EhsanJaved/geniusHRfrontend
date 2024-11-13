import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaPen, FaPlus } from 'react-icons/fa';
import EmployeeModal from './EmployeeModal';
import ProImage from '../assets/blank-profile.png';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 8;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false); // For the Add Employee modal

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

  const handleAddEmployee = () => {
    setIsAddEmployeeModalOpen(true); // Open the modal to add a new employee
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false); // Close the modal
  };

  return (
    <>
     <div className='flex justify-between pr-9'>
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Employees</h1>
        <button
              onClick={handleAddEmployee}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Employee
            </button>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">      

          {/* Employee Table */}
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

          {/* Pagination Controls */}
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

      {/* Add Employee Modal (Placeholder for modal) */}
      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
            {/* You can replace this section with an actual form to add an employee */}
            <form>
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" className="w-full p-2 border rounded-md mb-4" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" className="w-full p-2 border rounded-md mb-4" placeholder="Enter email" />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black font-bold rounded-md"
                  onClick={closeAddEmployeeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedEmployee && <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
    </>
  );
};

export default Employees;
