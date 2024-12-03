import React from "react";

const ApplicationModal = ({ isOpen, onClose, application }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  // Function to render application details dynamically
  const renderDetails = (details) => {
    if (!details || Object.keys(details).length === 0) {
      return <p>No additional details available.</p>;
    }

    let parsedDetails = details;
    if (typeof details === "string") {
      try {
        parsedDetails = JSON.parse(details);
      } catch (error) {
        console.error("Failed to parse details:", error);
        return <p>Invalid details format.</p>;
      }
    }

    return (
      <ul className="list-disc list-inside space-y-2">
        {Object.entries(parsedDetails).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>{" "}
            {value !== null && value !== undefined ? `${value}` : "N/A"}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Application Details
        </h2>

        {/* Modal Content */}
        {application ? (
          <div>
            {/* <p className="mb-3">
              <strong>ID:</strong> {application.id}
            </p> */}
            <p className="mb-3">
              <strong>Application Type:</strong> {application.type}
            </p>
            <p className="mb-3">
              <strong>Submission Date:</strong>{" "}
              {application.date}
            </p>
            <p className="mb-3">
              <strong>Last Updated:</strong>{" "}
              {application.updated_at_date}
            </p>
            <p className="mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  application.status === "approved"
                    ? "text-green-600"
                    : application.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {application.status} 
              </span>{" "}
              by  {application.status_updated_by || "None"}
            </p>
           

            {/* Application Details */}
            <div className="mb-3">
              <strong>Details:</strong>
              <div className="mt-2 bg-gray-100 p-3 rounded-lg max-h-40 overflow-y-auto">
                {renderDetails(application.details)}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No application selected.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
