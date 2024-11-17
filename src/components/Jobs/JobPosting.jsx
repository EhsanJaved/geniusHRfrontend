import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateJobModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobData, setJobData] = useState({
        title: "", 
        description: "",
        department: 0,
        post_date: "",
        close_date: "",
        max_salary_range: 0,
        job_status: "",
        employment_type: "",
        required_skills: [],
    });
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/jobs/skills/");
                setSkills(response.data);
            } catch (error) {
                console.error("Error fetching skills:", error);
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

        fetchSkills();
        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevJobData) => ({
            ...prevJobData,
            [name]: value,
        }));
    };

    const handleDepartmentChange = (e) => {
        setJobData((prevJobData) => ({
            ...prevJobData,
            department: parseInt(e.target.value),
        }));
    };

    const handleSkillChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const skillIds = selectedOptions.map(option => parseInt(option.value));
        setSelectedSkills(skillIds);
        setJobData((prevJobData) => ({
            ...prevJobData,
            required_skills: skillIds,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/jobs/JobPosting/", jobData);
            console.log("Job created successfully:", response.data);
            setJobData({
                title: "",
                description: "",
                department: "",
                post_date: "",
                close_date: "",
                max_salary_range: "",
                job_status: "Open",
                employment_type: "Full Time",
                required_skills: [],
            });
            setSelectedSkills([]);
            setIsModalOpen(false);
            alert("Job created successfully!");
        } catch (error) {
            console.error("Error creating job:", error);
            alert("Failed to create job. Please try again.");
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Create Job
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-2">Create Job Posting</h2>

                        <form onSubmit={handleSubmit}>
                            <label className="block mb-1">
                                <span className="text-gray-700">Job Title</span>
                                <input
                                    type="text"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border p-1 rounded-md"
                                    required
                                />
                            </label>

                            <label className="block mb-1">
                                <span className="text-gray-700">Description</span>
                                <textarea
                                    name="description"
                                    value={jobData.description}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border p-1 rounded-md"
                                    required
                                />
                            </label>

                            <label className="block mb-1">
                                <span className="text-gray-700">Department</span>
                                <select
                                    name="department"
                                    value={jobData.department}
                                    onChange={handleDepartmentChange}
                                    className="block w-full mt-1 border p-1 rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.department_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Post Date and Close Date in one line */}
                            <div className="flex gap-2 mb-1">
                                <label className="flex-1">
                                    <span className="text-gray-700">Post Date</span>
                                    <input
                                        type="date"
                                        name="post_date"
                                        value={jobData.post_date}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 border p-1 rounded-md"
                                        required
                                    />
                                </label>

                                <label className="flex-1">
                                    <span className="text-gray-700">Close Date</span>
                                    <input
                                        type="date"
                                        name="close_date"
                                        value={jobData.close_date}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 border p-1 rounded-md"
                                        required
                                    />
                                </label>
                            </div>

                            <label className="block mb-1">
                                <span className="text-gray-700">Max Salary Range</span>
                                <input
                                    type="number"
                                    name="max_salary_range"
                                    value={jobData.max_salary_range}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border p-1 rounded-md"
                                    required
                                />
                            </label>

                            {/* Job Status and Employment Type in one line */}
                            <div className="flex gap-2 mb-1">
                                <label className="flex-1">
                                    <span className="text-gray-700">Job Status</span>
                                    <select
                                        name="job_status"
                                        value={jobData.job_status}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 border p-1 rounded-md"
                                        required
                                    >
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </label>

                                <label className="flex-1">
                                    <span className="text-gray-700">Employment Type</span>
                                    <select
                                        name="employment_type"
                                        value={jobData.employment_type}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 border p-1 rounded-md"
                                        required
                                    >
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                </label>
                            </div>

                            <label className="block mb-2">
                                <span className="text-gray-700">Required Skills</span>
                                <select
                                    multiple
                                    value={selectedSkills}
                                    onChange={handleSkillChange}
                                    className="block w-full mt-1 border p-1 rounded-md"
                                    required
                                >
                                    {skills.map((skill) => (
                                        <option key={skill.id} value={skill.id}>
                                            {skill.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-3 py-1 rounded-md"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                >
                                    Create Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateJobModal;
