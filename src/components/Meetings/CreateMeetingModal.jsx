import React, { useState } from "react";
import axios from "axios";

const CreateMeetingModal = ({ isOpen, setIsOpen, users, handleCreateSuccess }) => {
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    status: "",
    outcome: "",
    members: [],
  });

  const STATUS_STYLES = {
    Pending: "bg-yellow-200 text-yellow-800",
    Done: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
    Reschedule: "bg-blue-200 text-blue-800",
  };

  const handleCreateSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // Prepare the meeting data
      const meetingDataToCreate = {
        ...newMeeting,
        member_ids: newMeeting.members.map((member) => member.id),
      };

      // Send the data to the backend to create the meeting
      const response = await axios.post(
        "http://127.0.0.1:8000/meet/api/meetings/",
        meetingDataToCreate,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      handleCreateSuccess(response.data); // Pass the newly created meeting to the parent
      setIsOpen(false); // Close the modal
      setNewMeeting({
        title: "",
        date: "",
        time: "",
        location: "",
        status: "",
        outcome: "",
        members: [],
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-semibold mb-4">Create New Meeting</h3>

          <input
            className="w-full mb-4 p-2 border rounded"
            type="text"
            placeholder="Title"
            value={newMeeting.title}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, title: e.target.value })
            }
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="date"
            value={newMeeting.date}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, date: e.target.value })
            }
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="time"
            value={newMeeting.time}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, time: e.target.value })
            }
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="text"
            placeholder="Location"
            value={newMeeting.location}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, location: e.target.value })
            }
          />
          <textarea
            className="w-full mb-4 p-2 border rounded"
            placeholder="Outcome"
            value={newMeeting.outcome}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, outcome: e.target.value })
            }
          />
          <select
            className="w-full mb-4 p-2 border rounded"
            value={newMeeting.status}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Reschedule">Reschedule</option>
          </select>

          {/* Members Dropdown */}
          <div className="mb-4">
            <label className="block mb-2">Members</label>
            <select
              className="w-full p-2 border rounded"
              multiple
              value={newMeeting.members.map((member) => member.id)}
              onChange={(e) =>
                setNewMeeting({
                  ...newMeeting,
                  members: Array.from(e.target.selectedOptions, (option) =>
                    users.find((user) => user.id === parseInt(option.value))
                  ),
                })
              }
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleCreateSubmit}
            >
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateMeetingModal;
