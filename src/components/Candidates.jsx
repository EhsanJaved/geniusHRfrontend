import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import {BsPersonFillCheck}  from 'react-icons/bs'
const initialCandidates = [
  { id: 1, name: "Aisha Khan", appliedPosition: "Software Engineer", experience: 3, contact: "aisha.khan@gmail.com", status: "Interview Scheduled", score: 85 },
  { id: 2, name: "Bilal Ahmed", appliedPosition: "Product Designer", experience: 2, contact: "bilal.ahmed@gmail.com", status: "Application Under Review", score: 70 },
  { id: 3, name: "Maria Sheikh", appliedPosition: "Data Analyst", experience: 5, contact: "maria.sheikh@gmail.com", status: "Rejected", score: 60 },
  { id: 4, name: "Ali Raza", appliedPosition: "Backend Developer", experience: 4, contact: "ali.raza@gmail.com", status: "Hired", score: 90 },
  { id: 5, name: "Sara Mir", appliedPosition: "Frontend Developer", experience: 1, contact: "sara.mir@gmail.com", status: "Shortlisted", score: 75 },
  { id: 6, name: "Omar Saeed", appliedPosition: "Project Manager", experience: 6, contact: "omar.saeed@gmail.com", status: "Interview Scheduled", score: 65 },
  { id: 7, name: "Asma Ali", appliedPosition: "UI/UX Designer", experience: 4, contact: "asma.ali@gmail.com", status: "Hired", score: 78 },
  { id: 8, name: "John Doe", appliedPosition: "Marketing Manager", experience: 5, contact: "john.doe@gmail.com", status: "Rejected", score: 55 },
  { id: 9, name: "Jane Smith", appliedPosition: "HR Specialist", experience: 2, contact: "jane.smith@gmail.com", status: "Application Under Review", score: 63 },
  { id: 10, name: "Mark Wilson", appliedPosition: "Sales Executive", experience: 1, contact: "mark.wilson@gmail.com", status: "Shortlisted", score: 71 },
  { id: 11, name: "Emily Carter", appliedPosition: "Data Scientist", experience: 3, contact: "emily.carter@gmail.com", status: "Interview Scheduled", score: 87 },
];

// Helper function to get ordinal suffix
const getOrdinal = (n) => {
  const suffix = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return n + (suffix[(remainder - 20) % 10] || suffix[remainder] || suffix[0]);
};

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  // const [sortField, setSortField] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 10;

  // Sort candidates based on selected field
  const handleSort = (field) => {
    const sortedCandidates = [...candidates].sort((a, b) => {
      if (field === "score" || field === "experience") return b[field] - a[field];
      return a[field].localeCompare(b[field]);
    });
    setCandidates(sortedCandidates);
    // setSortField(field);
  };

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered candidates
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Candidates</h1>
      
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Find by Name, Position, or Contact"
            className="p-2 border border-gray-300 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="relative">
            <select
              className="px-3 py-2 border rounded text-gray-700 bg-white"
              onChange={(e) => handleSort(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Sort By</option>
              <option value="appliedPosition">Position</option>
              <option value="score">Score</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Rank</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Name</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Position</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Experience</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Contact</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Status</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Score</th>
                <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-b">
                  <td className="py-3 px-5 text-gray-700">
                    {getOrdinal(indexOfFirstCandidate + index + 1)}
                  </td>
                  <td className="py-3 px-5 text-gray-700">{candidate.name}</td>
                  <td className="py-3 px-5 text-gray-700">{candidate.appliedPosition}</td>
                  <td className="py-3 px-5 text-gray-700">{candidate.experience} years</td>
                  <td className="py-3 px-5 text-gray-700">{candidate.contact}</td>
                  <td className="py-3 px-5 text-gray-700">{candidate.status}</td>
                  <td className="py-3 px-5 text-gray-700">{candidate.score} / 100</td>
                  <td className="py-3 px-5">
                    <button className="text-blue-500 hover:underline mr-2"><FaEye /></button>
                    <button className="text-red-500 hover:underline"><FaTrash /></button>
                    <button className="text-green-500 hover:underline"><BsPersonFillCheck /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredCandidates.length / candidatesPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CandidatesPage;
