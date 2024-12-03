import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate + "T00:00:00Z"); // Ensure UTC
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const formatTime = (isoTime, date = null) => {
    if (!isoTime) return "N/A";
    const dateTime = date ? `${date}T${isoTime}Z` : isoTime + "Z"; // Ensure UTC
    const time = new Date(dateTime);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAttendanceData = async () => {
      try {
        const [attendanceResponse, usersResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/att/attendance/all/", {
            headers: {
              Authorization: "token " + token,
            },
          }),
          axios.get("http://127.0.0.1:8000/meet/api/users/", {
            headers: {
              Authorization: "token " + token,
            },
          }),
        ]);
        setAttendances(attendanceResponse.data);
        setFilteredData(attendanceResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const getUserInfo = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return { name: "Unknown", department: "N/A" };
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username;
    const department = user.department?.department_name || "N/A";
    return { name: fullName, department };
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = attendances.filter((item) => {
      const userInfo = getUserInfo(item.user);
      const itemDate = formatDate(item.date);
      return (
        item.id.toString().includes(searchTerm) ||
        itemDate.includes(searchTerm) ||
        userInfo.name.toLowerCase().includes(lowerCaseSearch)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      const filtered = attendances.filter((item) => formatDate(item.date) === formattedDate);
      setFilteredData(filtered);
    } else {
      setFilteredData(attendances);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (<>
  <div className="flex justify-between pr-9">
  <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Employee Attendance</h1>
    {/* Search Section */}
    <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search Users"
          className="border border-gray-300 px-4 py-2 shadow-md rounded-lg overflow-hidden"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 px-4 py-2 flex-1 shadow-md rounded-lg overflow-hidden"
          placeholderText="Select a date"
        />
      </div>
  </div> 
    <div className="container mx-auto p-4">
      

      {/* Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr> 
            <th className="px-6 py-4 bg-gray-100 ">User</th>
            <th className="px-6 py-4 bg-gray-100 ">Department</th>
            <th className="px-6 py-4 bg-gray-100 ">Date</th>
            <th className="px-6 py-4 bg-gray-100 ">Check-In Time</th>
            <th className="px-6 py-4 bg-gray-100 ">Check-Out Time</th>
            <th className="px-6 py-4 bg-gray-100 ">Late</th>
            <th className="px-6 py-4 bg-gray-100 ">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((attendance) => {
            const { name, department } = getUserInfo(attendance.user);
            return (
              <tr className="border-b hover:bg-gray-50" key={attendance.id}>
                <td className="px-4 py-3 text-center">{name}</td>
                <td className="px-4 py-3 text-center">{department}</td>
                <td className="px-4 py-3 text-center">{formatDate(attendance.date)}</td>
                <td className="px-4 py-3 text-center">
                  {formatTime(attendance.check_in_time, attendance.date) || "N/A"}
                </td>
                <td className="px-4 py-3 text-center">
                  {formatTime(attendance.check_out_time, attendance.date) || "N/A"}
                </td>
                <td className="px-4 py-3 text-center">{attendance.is_late ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-center">{attendance.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
};

export default AttendanceList;
