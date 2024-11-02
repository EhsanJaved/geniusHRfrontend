import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
const meetingsData = [
  { id: 1, title: "Project Kickoff", date: "2024-11-02", time: "10:00 AM", members: ["Alice", "Bob"], location: "Room A", status: "Done", outcome: "Project initiation" },
  { id: 2, title: "Weekly Sync", date: "2024-11-05", time: "3:00 PM", members: ["Alice", "Charlie"], location: "Room B", status: "Pending", outcome: "Weekly updates" },
  // Add more meetings as needed
];

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
    <div className="">
      <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Meetings</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left">Title</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Date</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Time</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Location</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Status</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetingsData.map((meeting) => (
            <tr key={meeting.id} className="border-b" onClick={() => setSelectedMeeting(meeting)}>
              <td className="py-3 px-6">{meeting.title}</td>
              <td className="py-3 px-6">{meeting.date}</td>
              <td className="py-3 px-6">{meeting.time}</td>
              <td className="py-3 px-6">{meeting.location}</td>
              <td className="py-3 px-6">
                <span className={`px-2 py-1 rounded-full ${meeting.status === 'Done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {meeting.status}
                </span>
              </td>
              <td className="py-3 pl-12 text-blue-500 underline cursor-pointer">< FaEye/></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Meeting Details */}
      {selectedMeeting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-2">{selectedMeeting.title}</h3>
            <p><strong>Date:</strong> {selectedMeeting.date}</p>
            <p><strong>Time:</strong> {selectedMeeting.time}</p>
            <p><strong>Location:</strong> {selectedMeeting.location}</p>
            <p><strong>Status:</strong> {selectedMeeting.status}</p>
            <p><strong>Outcome:</strong> {selectedMeeting.outcome}</p>
            <p><strong>Members:</strong> {selectedMeeting.members.join(', ')}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedMeeting(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
