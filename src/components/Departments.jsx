import { useState, useEffect } from 'react';

export default function DepartmentManagementPage() {
  const [departments, setDepartments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentLocation, setNewDepartmentLocation] = useState('');

  // Fetch departments and employees data
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchDepartments = async () => {
      const data = [
        {
          id: 1,
          name: 'HR',
          employees: [
            { id: 1, name: 'Alice Johnson', role: 'HR Manager' },
            { id: 2, name: 'John Smith', role: 'Recruiter' },
          ],
        },
        {
          id: 2,
          name: 'Engineering',
          employees: [
            { id: 3, name: 'Ehsan Javed', role: 'Software Engineer' },
            { id: 4, name: 'Sarah Brown', role: 'Data Scientist' },
          ],
        },
        {
          id: 3,
          name: 'Marketing',
          employees: [
            { id: 5, name: 'Tom White', role: 'Marketing Specialist' },
          ],
        },
      ];
      setDepartments(data);
    };

    fetchDepartments();
  }, []);

  // Toggle department employees visibility
  const toggleEmployees = (departmentId) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === departmentId ? { ...dept, isOpen: !dept.isOpen } : dept
      )
    );
  };

  // Handle creating a new department
  const createDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment = {
        id: departments.length + 1,
        name: newDepartmentName,
        employees: [],
      };
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName('');
      setIsCreateModalOpen(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Department Management</h2>

      {/* Create Department Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Create New Department
      </button>

      <div className="space-y-4">
        {departments.map((department) => (
          <div key={department.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{department.name}</h3>
              <button
                onClick={() => toggleEmployees(department.id)}
                className="text-blue-500"
              >
                {department.isOpen ? 'Hide Employees' : 'View Employees'}
              </button>
            </div>
            {department.isOpen && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                {department.employees.length > 0 ? (
                  department.employees.map((employee) => (
                    <div key={employee.id} className="flex justify-between mb-2">
                      <span>{employee.name}</span>
                      <span className="text-gray-500">{employee.role}</span>
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
  );
}
