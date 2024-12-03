import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateApplicationsPage = () => {
  // const [applicationTypes, setApplicationTypes] = useState([]);
  const [filteredLeaveTypes, setFilteredLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch application types on component mount
  useEffect(() => {
    const fetchApplicationTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/appli/types/", {
          headers: { Authorization: `token ${token}` },
        });

        // Filter the response to get only "Leave" type applications
        const leaveTypes = response.data.filter(
          (type) => type.type_application === "Leave"
        );
        // setApplicationTypes(response.data); // Store all application types
        setFilteredLeaveTypes(leaveTypes); // Store only leave types
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);

    const token = localStorage.getItem("token"); // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    const dataToSend = {
      application_type: formData.leave_type_id, // Send the selected leave type ID
      details: {
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason,
      },
    };

    try {
      // Send the leave request to the API
      await axios.post("http://127.0.0.1:8000/appli/list/", dataToSend, config);
      console.log("Leave application submitted successfully");
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting the leave application:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderForm = () => {
    if (filteredLeaveTypes.length === 0) {
      return <div>No leave application types found.</div>;
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            name="leave_type_id"
            onChange={handleChange}
            value={formData.leave_type_id || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Leave Type</option>
            {filteredLeaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name_application}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            name="start_date"
            type="date"
            onChange={handleChange}
            value={formData.start_date || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            name="end_date"
            type="date"
            onChange={handleChange}
            value={formData.end_date || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            name="reason"
            onChange={handleChange}
            value={formData.reason || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter the reason for leave"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Submit Leave Application
        </button>
      </form>
    );
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 mb-4 px-4 py-3 text-white rounded-md shadow-md flex items-center effect-3d hover:shadow-inner hover:shadow-slate-700"
      >
        Leave Application Form
      </button>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={toggleModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Create Leave Application</h2>
              {renderForm()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateApplicationsPage;
