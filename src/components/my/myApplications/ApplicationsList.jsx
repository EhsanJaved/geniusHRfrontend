import React, { useState, useEffect } from "react";
import ApplicationModal from "./ApplicationModal";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
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
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/appli/my-applications/",{
                headers: { Authorization: `Token ${token}` },
              }); 
        const data = await response.json(); 
                  
        // Map the API data to match the component's structure
        const formattedData = data.map((app) => {
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

          return {
            id: app.id,
            type: typeMapping[app.application_type] || "Unknown Application",
            date: new Date(app.created_at).toLocaleDateString(),
            status:
              app.status.charAt(0).toUpperCase() + app.status.slice(1), // Capitalize status
              status_updated_by: app.status_updated_by,
              updated_at_date: new Date(app.updated_at).toLocaleDateString(),
            details: JSON.stringify(app.details, null, 2), // Convert details object to readable format
          };
        });

        setApplications(formattedData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

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
                <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-sm font-extrabold text-gray-600">
                  Type
                </th>
                <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-sm font-extrabold text-gray-600">
                  Submission Date
                </th>
                <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-sm font-extrabold text-gray-600">
                  Status
                </th>
                <th className="border-b-2 border-gray-200 px-4 py-3 text-left text-sm font-extrabold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentapplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-800">
                    {app.type}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-800">
                    {app.date}
                  </td>
                  <td
                    className={`border-b border-gray-200 px-4 py-3 text-sm font-semibold ${
                      app.status === "Approved"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3">
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
