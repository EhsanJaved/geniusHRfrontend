import React, { useState, useEffect } from "react";
import ApplicationModal from "./ApplicationModal";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

    // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 8;

  const indexOfLastEmployee = currentPage * applicationsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - applicationsPerPage;
  const currentapplications = applications.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Fetch applications from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch users and applications concurrently
        const [usersResponse, applicationsResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/appli/applicants/", {
            headers: { Authorization: `Token ${token}` },
          }),
          fetch("http://127.0.0.1:8000/appli/applications-to-review/", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        const usersData = await usersResponse.json(); 
        const applicationsData = await applicationsResponse.json();

        setUsers(usersData); // Update users state

        // Map applications with user information
        const formattedData = applicationsData.map((app) => {
          const typeMapping = {
            3: "Sick Leave",
            4: "Annual Leave",
            5: "Casual Leave",
            6: "Maternity Leave",
            7: "Termination",
            8: "New Hiring",
            9: "Resignation",
            10: "Half-Day Request",
            11: "Promotion Request",
          };

          // Ensure that we have users data available before accessing user info
          const user = usersData.find((user) => user.id === app.user);

          return {
            id: app.id,
            type: typeMapping[app.application_type] || "Unknown Application",
            date: new Date(app.created_at).toLocaleDateString(),
            status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
            user: user
              ? `${user.first_name} ${user.last_name}`.trim() || user.username
              : "Unknown User",
            department: user?.department_name || "No Department",
            status_updated_by: app.status_updated_by,
            updated_at_date: new Date(app.updated_at).toLocaleDateString(),
            details: JSON.stringify(app.details, null, 2),
          };
        });

        setApplications(formattedData); // Update applications state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Only run once when the component mounts

  const openModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {applications.length > 0 ? (
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-100">
                  Name of Applicant
                </th>
                <th className="px-6 py-4 bg-gray-100">
                  Type
                </th>
                <th className="px-6 py-4 bg-gray-100">
                  Submission Date
                </th>
                <th className="px-6 py-4 bg-gray-100">
                  Status
                </th>
                <th className="px-6 py-4 bg-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentapplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-800 text-center">
                    {app.user}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-800 text-center">
                    {app.type}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-800 text-center">
                    {app.date}
                  </td>
                  <td
                    className={`border-b border-gray-200 px-4 py-3 text-sm font-semibold text-center ${
                      app.status === "Approved"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-center">
                    <button
                      onClick={() => openModal(app)}
                      className="rounded-lg bg-indigo-500 py-1 px-3 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      ) : (
        <div className="text-center text-gray-500">
          You have no applications yet.
        </div>
      )}
        {/* pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="bg-gray-300 px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal for viewing application details */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        application={selectedApplication}
      />
    </div>
  );
};

export default ApplicationsList;
