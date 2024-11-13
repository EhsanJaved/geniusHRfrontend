// src/components/JobList.js
import React, { useState } from "react";

const dummyJobs = [
    { id: 1, title: "Software Engineer", description: "Build cool features.", company: "TechCorp", status: "open", posted_on: "2024-11-01" },
    { id: 2, title: "Product Manager", description: "Lead product strategy.", company: "BizInc", status: "closed", posted_on: "2024-10-25" },
    { id: 3, title: "UX Designer", description: "Design awesome interfaces.", company: "DesignCo", status: "pending", posted_on: "2024-11-05" },
    { id: 4, title: "Data Scientist", description: "Analyze data trends.", company: "DataX", status: "open", posted_on: "2024-11-02" },
    { id: 5, title: "Backend Developer", description: "Develop server-side logic.", company: "DevHub", status: "open", posted_on: "2024-10-30" },
    { id: 6, title: "Frontend Developer", description: "Create beautiful UIs.", company: "PixelSoft", status: "closed", posted_on: "2024-10-29" },
];

const JobList = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const openJobDetails = (job) => {
        setSelectedJob(job); // Set the job to show details in a modal
    };

    const closeJobDetails = () => {
        setSelectedJob(null); // Close the job details modal
    };

    return (
        <div className="max-w-6xl mx-auto mt-5 p-5">
           

            {/* Job Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dummyJobs.map((job) => (
                    <div
                        key={job.id}
                        className="p-5 border rounded-2xl shadow-lg bg-white cursor-pointer"
                        onClick={() => openJobDetails(job)} // Show details when clicked
                    >
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-sm mb-2">{job.description}</p>
                        <p className="text-md font-medium">Company: {job.company}</p>
                        <p className={`text-sm mt-2 ${job.status === "open" ? "text-green-500" : job.status === "closed" ? "text-red-500" : "text-yellow-500"}`}>
                            Status: {job.status}
                        </p>
                        <p className="text-sm text-gray-500">Posted on: {new Date(job.posted_on).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {/* Modal for Job Details */}
            {selectedJob && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-1/3 p-5 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
                        <p className="text-lg mb-4">{selectedJob.description}</p>
                        <p className="text-md font-medium mb-4">Company: {selectedJob.company}</p>
                        <p className={`text-sm mt-2 ${selectedJob.status === "open" ? "text-green-500" : selectedJob.status === "closed" ? "text-red-500" : "text-yellow-500"}`}>
                            Status: {selectedJob.status}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">Posted on: {new Date(selectedJob.posted_on).toLocaleDateString()}</p>
                        <button
                            onClick={closeJobDetails}
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
