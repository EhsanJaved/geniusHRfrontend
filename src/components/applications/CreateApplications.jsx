import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateApplicationsPage = () => {
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [formData, setFormData] = useState({ details: {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [userRole, setUserRole] = useState("");

  // Fetch application types on component mount
  useEffect(() => {
    const fetchApplicationTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/appli/types/", {
          headers: { Authorization: `Token ${token}` },
        });

        // Filter out "Leave" and "Resignation" types
        const filteredTypes = response.data.filter(
          (type) => type.type_application !== "Leave" && type.type_application !== "Resignation"
        );
        setApplicationTypes(filteredTypes); // Store the filtered application types
      } catch (error) {
        console.error("Error fetching application types:", error);
      }
    };

    // Get the user's role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role);
    }

    fetchApplicationTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [name]: value }, // Ensure the details field is updated correctly
    }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting application data:", formData);

    const token = localStorage.getItem("token"); // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    const dataToSend = {
      application_type: selectedApplicationType, // Send the selected application type ID
      details: formData.details, // Send other details
    };

    try {
      // Send the application request to the API
      await axios.post("http://127.0.0.1:8000/appli/list/", dataToSend, config);
      console.log("Application submitted successfully");
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderApplicationFields = () => {
    const fields = {
      "7": [
        { name: "termination_date", type: "date", label: "Termination Date" },
        { name: "Name_of_Employ", type: "text", label: "Employ Name" },
        { name: "reason", type: "textarea", label: "Reason" },
      ],
      "8": [
        { name: "position", type: "text", label: "Position" },
        { name: "department", type: "text", label: "Department" },
        { name: "justification", type: "textarea", label: "Justification" },
        { name: "expected_joining_date", type: "date", label: "Expected Joining Date" },
      ],
      "11": [
        { name: "full_name", type: "text", label: "Your Name" },
        { name: "current_position", type: "text", label: "Current Position" },
        { name: "proposed_position", type: "text", label: "Proposed Position" },
        { name: "justification", type: "textarea", label: "Justification" },
      ],
      "10": [
        { name: "date", type: "date", label: "Date" },
        { name: "half_day", type: "checkbox", label: "Half Day" },
        { name: "reason", type: "textarea", label: "Reason" },
      ],
    };

    const applicationFields = fields[selectedApplicationType];

    // If no fields are defined for the selected type, return a message
    if (!applicationFields) {
      return (
        <p className="text-sm text-gray-500">No additional information required for this application type.</p>
      );
    }

    // Render fields dynamically for selected application type
    return applicationFields.map((field, index) => {
      if (field.type === "textarea") {
        return (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <textarea
              name={field.name}
              onChange={handleChange}
              value={formData.details?.[field.name] || ""}
              className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required
            />
          </div>
        );
      }
      if (field.type === "checkbox") {
        return (
          <div key={index}>
            <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
              <input
                type="checkbox"
                name={field.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    details: { ...prev.details, [field.name]: e.target.checked },
                  }))
                }
                checked={formData.details?.[field.name] || false}
                className="focus:ring-indigo-500 focus:border-indigo-500"
              />
              {field.label}
            </label>
          </div>
        );
      }
      return (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            onChange={handleChange}
            value={formData.details?.[field.name] || ""}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      );
    });
  };

  const isApplicationAllowed = () => {
    if (selectedApplicationType === "7" || selectedApplicationType === "8") {
      return userRole !== "Employee"; // Restrict Termination and Hiring to non-Employees
    }
    return true;
  };

  return (
    <div>
      <button onClick={toggleModal} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Create Application
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <button
              onClick={toggleModal}
              className="top-2 left-80 text-gray-500 hover:text-gray-800 relative"
              aria-label="Close"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Create Application</h2>
            <form onSubmit={handleApplicationSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Application Type</label>
                <select
                  value={selectedApplicationType}
                  onChange={(e) => setSelectedApplicationType(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select application type</option>
                  {applicationTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_application}
                    </option>
                  ))}
                </select>
              </div>

              {selectedApplicationType && renderApplicationFields()}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={!isApplicationAllowed()}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateApplicationsPage;
