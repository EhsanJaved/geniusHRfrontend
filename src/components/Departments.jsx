import { useState, useEffect } from 'react';
import axios from 'axios';
import ProImage from '../assets/blank-profile.png';
export default function DepartmentManagementPage() {
  const [departments, setDepartments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentLocation, setNewDepartmentLocation] = useState('');

  // Fetch departments data
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/emp/departments/', {
          headers: { Authorization: `Token ${token}` },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Toggle department employees visibility
  const toggleEmployees = (departmentIndex) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept, index) =>
        index === departmentIndex ? { ...dept, isOpen: !dept.isOpen } : dept
      )
    );
  };

  // Handle deleting a department
  const deleteDepartment = async (departmentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/emp/departments/${departmentId}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
      
      setDepartments(departments.filter((dept) => dept.id !== departmentId));
      alert("Department deleted successfully");
    } catch (error) {
      console.error('Error deleting department:', error);
      alert("Failed to delete department");
    }
  };

  // Handle creating a new department
  const createDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment = {
        department_name: newDepartmentName,
        department_location: newDepartmentLocation,
        employees: [],
      };
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName('');
      setNewDepartmentLocation('');
      setIsCreateModalOpen(false);
    }
  };

  return (
    <>
      <div className='flex justify-between pr-9'>
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Department Management</h1>
        <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Create New Department
      </button>
      </div>
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        {departments.map((department, index) => (
          <div key={department.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{department.department_name}</h3>
                <span className="text-gray-500">{department.department_location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleEmployees(index)}
                  className="text-blue-500"
                >
                  {department.isOpen ? 'Hide Employees' : 'View Employees'}
                </button>
                <button
                  onClick={() => deleteDepartment(department.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            {department.isOpen && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                {department.employees.length > 0 ? (
                  department.employees.map((employee, empIndex) => (
                    <div key={empIndex} className="flex items-center mb-4">
                      <img
                        src={employee.img || ProImage}
                        alt={employee.first_name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-gray-500">{employee.email}</p>
                        <p className="text-gray-500">
                          Role: {employee.role ? employee.role.role : 'N/A'}
                        </p>
                        <p className="text-gray-500">
                          Salary: {employee.salary} | Bonus: {employee.bonus}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No employees in this department.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Department Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Create New Department</h3>
            <input
              type="text"
              placeholder="Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              className="border p-2 rounded w-full m-2"
            />
            <input
              type="text"
              placeholder="Department Location"
              value={newDepartmentLocation}
              onChange={(e) => setNewDepartmentLocation(e.target.value)}
              className="border p-2 rounded w-full m-2"
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={createDepartment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
