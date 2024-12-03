import React, { useEffect, useState } from "react";
import axios from "axios";

const ResignationApplication = () => {
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [formData, setFormData] = useState({
    resignation_type_id: "", // Automatically set this value
  });
  const [isResignationModalOpen, setIsResignationModalOpen] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Fetch application types on component mount
  useEffect(() => {
    const fetchApplicationTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/appli/types/", {
          headers: { Authorization: `token ${token}` },
        });

        // Find the "Resignation" type application and set it as default
        const resignationType = response.data.find(
          (type) => type.type_application === "Resignation"
        );

        if (resignationType) {
          setFormData((prev) => ({
            ...prev,
            resignation_type_id: resignationType.id, // Set the resignation type ID automatically
          }));
        }

        setApplicationTypes(response.data); // Store all application types
      } catch (error) {
        console.error("Error fetching application types:", error);
      }
    };

    fetchApplicationTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResignationSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting resignation data:", formData);

    const token = localStorage.getItem("token"); // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    const dataToSend = {
      application_type: formData.resignation_type_id, // Send the selected resignation type ID
      details: {
        resignation_reason: formData.resignation_reason,
        last_working_day: formData.last_working_day,
      },
    };

    try {
      // Send the resignation request to the API
      await axios.post("http://127.0.0.1:8000/appli/list/", dataToSend, config);
      console.log("Resignation application submitted successfully");
      setIsResignationModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting resignation application:", error);
    }
  };

  const toggleResignationModal = () => {
    setIsResignationModalOpen(!isResignationModalOpen);
  };

  const renderResignationForm = () => {
    return (
      <form onSubmit={handleResignationSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for Resignation
          </label>
          <textarea
            name="resignation_reason"
            onChange={handleChange}
            value={formData.resignation_reason || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter the reason for resignation"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Working Day
          </label>
          <input
            name="last_working_day"
            type="date"
            onChange={handleChange}
            value={formData.last_working_day || getTodayDate()} // Set today's date by default
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-red-600 py-2 text-white font-semibold hover:bg-red-700 transition"
        >
          Submit Resignation Application
        </button>
      </form>
    );
  };

  return (
    <>
      <button
        onClick={toggleResignationModal}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md flex items-center effect-3d hover:shadow-inner hover:shadow-slate-700"
      >
        Resignation
      </button>

      {/* Resignation Modal */}
      <div>
        {isResignationModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={toggleResignationModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Create Resignation Application</h2>
              {renderResignationForm()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResignationApplication;
