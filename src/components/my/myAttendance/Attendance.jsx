import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import axios from "axios";
import CreateApplicationsPage from "./RequestLeaveModal";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  // Format time to a user-friendly format
  const formatTime = (time) => {
    if (!time) return "--";
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch attendance data from the backend API
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/att/attendance/mine/",
          {
            headers: { Authorization: `token ${token}` },
          }
        );
        const formattedData = response.data.map((record) => ({
          date: record.date,
          status:
            record.status === "P"
              ? record.is_late
                ? "Late"
                : "Present"
              : record.status === "A"
              ? "Absent"
              : "Leave",
          inTime: formatTime(record.check_in_time),
          leaveTime: formatTime(record.check_out_time),
        }));
        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const markAttendance = async () => {
    const token = localStorage.getItem("token");
    setIsMarkingAttendance(true); // Show loading state while marking attendance
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/att/attendance/mark/",
        {},
        {
          headers: { Authorization: `token ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Attendance marked successfully!");
        // You can refresh the attendance data after marking
        // fetchAttendanceData();
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Error marking attendance. Please try again.");
    } finally {
      setIsMarkingAttendance(false); // Hide loading state
    }
  };

  return (
    <>
      <div className="flex justify-between pr-9">
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">
          Attendance
        </h1>
        <div className="flex items-center space-x-3">
        <button
            onClick={markAttendance}
            disabled={isMarkingAttendance}
            className={`${
              isMarkingAttendance ? "bg-gray-500" : "bg-blue-500 mb-4 px-4 py-2 text-white rounded-md shadow-md flex items-center effect-3d hover:shadow-inner hover:shadow-slate-700"
            } px-6 py-3 text-white font-semibold rounded-lg efect-3d`}
          >
            {isMarkingAttendance ? "Marking..." : "Mark Attendance "}
          </button>
          <CreateApplicationsPage />
        </div>
      </div>
      <div className="p-8 space-y-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-4 bg-gray-100">Date</th>
                  <th className="px-6 py-4 bg-gray-100">Status</th>
                  <th className="px-6 py-4 bg-gray-100">In Time</th>
                  <th className="px-6 py-4 bg-gray-100">Leave Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((record, index) => (
                  <tr key={index} className="text-center border-b hover:bg-gray-50">
                    <td className="p-3 ">{record.date}</td>
                    <td className="p-3 ">
                      <span
                        className={`py-1 px-3 rounded-full text-white ${
                          record.status === "Present"
                            ? "bg-green-500"
                            : record.status === "Absent"
                            ? "bg-red-500"
                            : record.status === "Late"
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <FaClock className="inline-block mr-1 text-blue-500" />
                      {record.inTime}
                    </td>
                    <td className="p-3">
                      <FaClock className="inline-block mr-1 text-blue-500" />
                      {record.leaveTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden ${
              currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="bg-gray-300 px-4 py-2 mx-1 shadow-md rounded-lg overflow-hidden"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}
