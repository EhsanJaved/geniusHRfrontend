// src/components/JobPosting.js
import React, { useState } from "react";

const JobPosting = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("open");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleJobPosting = () => {
        alert(`Job Posted: ${title}, ${company}, Status: ${status}`);
        setTitle("");
        setDescription("");
        setCompany("");
        setStatus("open");
        setIsModalOpen(false); // Close modal after posting
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (<>
            <button 
                onClick={openModal} 
               className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mb-4 font-semibold hover:shadow-inner hover:shadow-slate-700 effect-3d"
            >
                Post a New Job
            </button>
        <div className="max-w-3xl mx-auto ">

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-1/3 p-5 shadow-lg">
                        <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
                        <form>
                            <div className="mb-4">
                                <label className="block text-lg">Job Title</label>
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    className="border p-2 w-full rounded-lg"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg">Job Description</label>
                                <textarea
                                    placeholder="Job Description"
                                    className="border p-2 w-full rounded-lg"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg">Company</label>
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="border p-2 w-full rounded-lg"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg">Status</label>
                                <select
                                    className="border p-2 w-full rounded-lg"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={handleJobPosting}
                                >
                                    Post Job
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default JobPosting;
