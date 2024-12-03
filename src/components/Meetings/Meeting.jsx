import axios from "axios";
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus  } from "react-icons/fa";
import CreateMeetingModal from "./CreateMeetingModal";
export default function MeetingsPage() {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [meetingData, setMeetingData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editMeeting, setEditMeeting] = useState({});
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(null);


  const STATUS_STYLES = {
    Pending: "bg-yellow-200 text-yellow-800",
    Done: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
    Reschedule: "bg-blue-200 text-blue-800",
  };

  useEffect(() => {
    const fetchUserRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserRole(user.role);
      }
    };

    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/meet/api/meetings/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setMeetingData(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/meet/api/users/", {
          headers: { Authorization: `Token ${token}` },
        });
        const formattedUsers = response.data.map((user) => ({
          ...user,
          displayName: `${user.first_name || user.username} (${
            user.department?.department_name || "No Department"
          })`,
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserRole();
    fetchMeetings();
    fetchUsers();
  }, []);

  const handleCreateMeeting = () => {
    setIsCreateModalOpen(true); 
  };
  const handleCreateSuccess = (newMeetingData) => {
    setMeetingData((prevData) => [...prevData, newMeetingData]);
    setIsCreateModalOpen(false);
  };
  

  const handleEditMeeting = (meeting) => {
    setEditMeeting(meeting);
    setIsEditModalOpen(true);
  };

  const handleDeleteMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setIsDeleteModalOpen(true);
  };
  const canCreateMeeting = ["Admin", "HR Admin", "Manager"].includes(userRole);

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/meet/api/meetings/${editMeeting.id}/`,
        {
          ...editMeeting,
          member_ids: editMeeting.members.map((member) => member.id),
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setIsEditModalOpen(false);

      // Update the local state to reflect changes
      setMeetingData((prev) =>
        prev.map((meeting) =>
          meeting.id === editMeeting.id ? { ...meeting, ...editMeeting } : meeting
        )
      );
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/meet/api/meetings/${selectedMeeting.id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setMeetingData((prev) =>
        prev.filter((meeting) => meeting.id !== selectedMeeting.id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  return (<>
      <div className="flex justify-between pr-9">
      <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Meetings</h1>
      {canCreateMeeting && (
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md flex items-center effect-3d hover:shadow-inherit"
          onClick={handleCreateMeeting}
        >
          <FaPlus className="mr-2" />
          Create Meeting
        </button>
      )}
      </div>
    <div className="p-8">
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
          {meetingData.map((meeting) => (
            <tr key={meeting.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{meeting.title}</td>
              <td className="py-3 px-6">{meeting.date}</td>
              <td className="py-3 px-6">{meeting.time}</td>
              <td className="py-3 px-6">{meeting.location}</td>
              <td className="py-3 px-6">
                <span
                  className={`px-2 py-1 rounded-full ${
                    STATUS_STYLES[meeting.status] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {meeting.status}
                </span>
              </td>
              <td className="py-3 flex space-x-2">
                <FaEye
                  className="text-green-500 cursor-pointer"
                  onClick={() => setMeetingDetails(meeting)}
                />
                {canCreateMeeting &&(
                  <>
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEditMeeting(meeting)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteMeeting(meeting)}
                />
                </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Meeting</h3>

            <input
              className="w-full mb-4 p-2 border rounded"
              type="text"
              placeholder="Title"
              value={editMeeting.title || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, title: e.target.value })
              }
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type="date"
              value={editMeeting.date || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, date: e.target.value })
              }
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type="time"
              value={editMeeting.time || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, time: e.target.value })
              }
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type="text"
              placeholder="Location"
              value={editMeeting.location || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, location: e.target.value })
              }
            />

            {/* Outcome Field */}
            <textarea
              className="w-full mb-4 p-2 border rounded"
              placeholder="Outcome"
              value={editMeeting.outcome || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, outcome: e.target.value })
              }
            />

            {/* Status Dropdown */}
            <select
              className="w-full mb-4 p-2 border rounded"
              value={editMeeting.status || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, status: e.target.value })
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
                value={editMeeting.members?.map((m) => m.id) || []}
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    members: Array.from(e.target.selectedOptions).map(
                      (option) => users.find((user) => user.id === Number(option.value))
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

            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details */}
      {meetingDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold">{meetingDetails.title}</h3>
            <p>Date: {meetingDetails.date}</p>
            <p>Time: {meetingDetails.time}</p>
            <p>Location: {meetingDetails.location}</p>
            <p>Status: {meetingDetails.status}</p>
            <p>Outcome: {meetingDetails.outcome}</p>
            <p>
                Members:
                {meetingDetails.members &&
                  meetingDetails.members.map((member) => (
                    <span key={member.id} className="block ml-4">
                      {member.first_name || member.username}{" "}
                      {member.department ? `(${member.department.department_name})` : "(No Department)"}
                    </span>
                  ))}
              </p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setMeetingDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
       {/* Delete Modal */}
       {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this meeting?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDeleteConfirm}
              > 
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateMeetingModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        users={users}
        handleCreateSuccess={handleCreateSuccess}
      />

    </div>
    </>
  );
}
