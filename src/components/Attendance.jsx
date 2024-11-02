import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  // Simulated fetch function for attendance data
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const data = [
        { date: '2024-10-01', status: 'Present', inTime: '09:00 AM', leaveTime: '05:00 PM' },
        { date: '2024-10-02', status: 'Absent', inTime: '--', leaveTime: '--' },
        { date: '2024-10-03', status: 'Present', inTime: '09:10 AM', leaveTime: '05:15 PM' },
        { date: '2024-10-04', status: 'Present', inTime: '08:55 AM', leaveTime: '05:00 PM' },
        { date: '2024-10-05', status: 'Leave', inTime: '--', leaveTime: '--' },
      ];
      setAttendanceData(data);
    };

    fetchData();
  }, []);

  // Function to handle leave form input changes
  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  // Function to submit leave request
  const submitLeaveRequest = () => {
    console.log("Leave Request Submitted:", leaveForm);
    setIsLeaveModalOpen(false);
    setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  return (<>
      <div className='flex justify-between pr-9'>
      <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Attendance Record</h1>
      <button
        onClick={() => setIsLeaveModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mb-4 font-semibold hover:shadow-inner hover:shadow-slate-700 effect-3d"
      >
        Request Leave
      </button>
    </div>
    <div className="p-8 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">In Time</th>
              <th className="p-3 border">Leave Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index} className="text-center">
                <td className="p-3 border">{record.date}</td>
                <td className="p-3 border">
                  <span
                    className={`py-1 px-3 rounded-full text-white ${
                      record.status === 'Present'
                        ? 'bg-green-500'
                        : record.status === 'Absent'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="p-3 border">
                  <FaClock className="inline-block mr-1 text-blue-500" />
                  {record.inTime}
                </td>
                <td className="p-3 border">
                  <FaClock className="inline-block mr-1 text-blue-500" />
                  {record.leaveTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Request Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Request Leave</h3>
            <div className="space-y-4">
              <select
                name="leaveType"
                value={leaveForm.leaveType}
                onChange={handleLeaveFormChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
              <input
                type="date"
                name="startDate"
                value={leaveForm.startDate}
                onChange={handleLeaveFormChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="endDate"
                value={leaveForm.endDate}
                onChange={handleLeaveFormChange}
                className="border p-2 rounded w-full"
              />
              <textarea
                name="reason"
                placeholder="Reason for Leave"
                value={leaveForm.reason}
                onChange={handleLeaveFormChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={submitLeaveRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
