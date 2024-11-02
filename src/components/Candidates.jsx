import React from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
const candidates = [
  {
    id: 1,
    name: "Aisha Khan",
    appliedPosition: "Software Engineer",
    experience: "3 years",
    contact: "aisha.khan@gmail.com",
    status: "Interview Scheduled"
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    appliedPosition: "Product Designer",
    experience: "2 years",
    contact: "bilal.ahmed@gmail.com",
    status: "Application Under Review"
  },
  {
    id: 3,
    name: "Maria Sheikh",
    appliedPosition: "Data Analyst",
    experience: "5 years",
    contact: "maria.sheikh@gmail.com",
    status: "Rejected"
  },
  // Add more candidates here...
];

const CandidatesPage = () => {
  return (<>
    <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Candidates</h1>
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Name</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Position</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Experience</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Contact</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Status</th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold uppercase text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id} className="border-b">
                <td className="py-3 px-5 text-gray-700">{candidate.name}</td>
                <td className="py-3 px-5 text-gray-700">{candidate.appliedPosition}</td>
                <td className="py-3 px-5 text-gray-700">{candidate.experience}</td>
                <td className="py-3 px-5 text-gray-700">{candidate.contact}</td>
                <td className="py-3 px-5 text-gray-700">{candidate.status}</td>
                <td className="py-3 px-5">
                  <button className="text-blue-500 hover:underline mr-2"><FaEye/></button>
                  {/* <button className="text-green-500 hover:underline mr-2"><FaPen/></button> */}
                  <button className="text-red-500 hover:underline"><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CandidatesPage;
