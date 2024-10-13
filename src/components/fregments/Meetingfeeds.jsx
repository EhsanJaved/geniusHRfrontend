import React from 'react';

const Meetings = () => {
  const meetings = [
    {
      id: 1,
      day: 'Mon',
      date: '10',
      title: 'Interview',
      time: '9:00 am - 11:30 am',
      color: 'bg-yellow-400',
    },
    {
      id: 2,
      day: 'Thu',
      date: '08',
      title: 'Organizational meeting',
      time: '9:00 am - 11:30 am',
      color: 'bg-orange-400',
    },
    {
      id: 3,
      day: 'Fri',
      date: '11',
      title: 'Meeting with the manager',
      time: '9:00 am - 11:30 am',
      color: 'bg-red-400',
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meetings</h2>
        <button className="text-gray-500 text-sm flex items-center space-x-1 border-slate-300 border rounded-lg p-2">
          <span>Create New</span>
          
        </button>
      </div>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* Date Badge */}
              <div className="flex flex-col items-center">
                <div className={`text-white font-bold px-2 py-1 rounded-lg ${meeting.color}`}>
                  {meeting.day}
                </div>
                <div className="text-lg font-semibold">{meeting.date}</div>
              </div>
              {/* Meeting Details */}
              <div>
                <p className="text-sm font-semibold">{meeting.title}</p>
                <p className="text-xs text-gray-500">{meeting.time}</p>
              </div>
            </div>
            {/* Actions */}
            <button className="text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12M6 6h12M6 18h12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meetings;
