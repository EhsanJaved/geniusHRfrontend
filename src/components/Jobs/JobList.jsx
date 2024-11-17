import React, { useState, useEffect } from "react";
import axios from "axios";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedJob, setEditedJob] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/jobs/JobPosting/");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };

        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/jobs/skills/");
                setSkills(response.data);
            } catch (error) {
                console.error("Error fetching skills data:", error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/jobs/DepartmentForJobs/");
                setDepartments(response.data);              
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
        fetchJobs();
        fetchSkills();
    }, []);

    const openJobDetails = (job) => {
        setSelectedJob(job);
        setEditedJob({ ...job });
        setSelectedSkills(job.required_skills.map(skill => skill.id));
        setIsEditing(false);
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
        setIsEditing(false);
        setEditedJob(null);
        setSelectedSkills([]);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const skillIds = selectedOptions.map(option => option.value);
        setSelectedSkills(skillIds);
    };

    const handleSave = async () => {
        try {
            const updatedJobData = { ...editedJob, required_skills: selectedSkills };

            await axios.put(`http://127.0.0.1:8000/jobs/JobPosting/${selectedJob.id}/`, updatedJobData);

            const response = await axios.get(`http://127.0.0.1:8000/jobs/JobPosting/${selectedJob.id}/`);
            const updatedJob = response.data;

            setJobs((prevJobs) =>
                prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
            );
            setSelectedJob(updatedJob);
            setIsEditing(false);

        } catch (error) {
            console.error("Error saving job:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/jobs/JobPosting/${selectedJob.id}/`);
            setJobs(jobs.filter((job) => job.id !== selectedJob.id));
            closeJobDetails();
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const getDepartmentName = (id) => {
        const department = departments.find((dept) => dept.id === id);
        return department ? department.department_name : "Unknown";
    };

    return (
        <div className="max-w-6xl mx-auto mt-5 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="p-5 border rounded-2xl shadow-lg bg-white cursor-pointer"
                        onClick={() => openJobDetails(job)}
                    >
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-sm mb-2">{job.description}</p>
                        <p className="text-md font-medium">Max Salary: {job.max_salary_range}</p>
                        <p className={`text-sm mt-2 ${job.job_status === "Open" ? "text-green-500" : "text-red-500"}`}>
                            Status: {job.job_status}
                        </p>
                        <p className="text-sm font-medium">Department: {getDepartmentName(job.department)}</p>
                        <p className="text-sm text-gray-500">Posted on: {new Date(job.post_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Closes on: {new Date(job.close_date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {selectedJob && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-1/3 p-5 shadow-lg">
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedJob.title}
                                    onChange={handleInputChange}
                                    className="text-2xl font-bold mb-4 border w-full p-2"
                                />
                                <textarea
                                    name="description"
                                    value={editedJob.description}
                                    onChange={handleInputChange}
                                    className="text-lg mb-4 border w-full p-2"
                                />
                                <input
                                    type="number"
                                    name="max_salary_range"
                                    value={editedJob.max_salary_range}
                                    onChange={handleInputChange}
                                    className="text-md font-medium mb-4 border w-full p-2"
                                />
                                <label className="block text-md font-semibold mb-2">Required Skills:</label>
                                <select
                                    multiple
                                    value={selectedSkills}
                                    onChange={handleSkillChange}
                                    className="border w-full p-2 mb-4"
                                >
                                    {skills.map(skill => (
                                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                                    ))}
                                </select>
                                <label className="block text-md font-semibold mb-2">Department:</label>
                                <select
                                    name="department"
                                    value={editedJob.department}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 mb-4"
                                >
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.department_name}</option>
                                    ))}
                                </select>
                                <label className="block text-md font-semibold mb-2">Post Date:</label>
                                <input
                                    type="date"
                                    name="post_date"
                                    value={editedJob.post_date}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 mb-4"
                                />
                                <label className="block text-md font-semibold mb-2">Close Date:</label>
                                <input
                                    type="date"
                                    name="close_date"
                                    value={editedJob.close_date}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 mb-4"
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                                <p className={`text-sm mb-4 ${selectedJob.job_status === "Open" ? "text-green-500" : "text-red-500"}`}>
                                    Status: {selectedJob.job_status}
                                </p>
                                <p className="text-sm mb-4">{selectedJob.description}</p>
                                <p className="text-sm font-medium mb-2">Department: {getDepartmentName(selectedJob.department)}</p>
                                <p className="text-md font-medium mb-2">Max Salary: {selectedJob.max_salary_range}</p>
                                <h3 className="text-md font-semibold mb-2">Required Skills:</h3>
                                <div className="list-disc list-inside mb-4">
                                    {selectedJob.required_skills.map((skill) => (
                                        <div key={skill.id}>{skill.name}</div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">Posted on: {new Date(selectedJob.post_date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Closes on: {new Date(selectedJob.close_date).toLocaleDateString()}</p>
                            </>
                        )}

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleEditToggle}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Save
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closeJobDetails}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
