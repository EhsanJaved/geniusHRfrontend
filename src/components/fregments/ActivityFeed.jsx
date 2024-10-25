import React from 'react';

const ActivityFeed = () => {
  // Sample data for the activity feed
  const activities = [
    {
      id: 1,
      name: 'Marvin McKinney',
      time: '10 mins ago',
      action: 'applied for the job',
      job: 'Product Designer',
      avatarColor: 'bg-green-100',
      actionType: 'Applying',
      actionColor: 'bg-blue-100 text-blue-500',
    },
    {
      id: 2,
      name: 'Jone Copper',
      time: '4 hours ago',
      action: 'requested for',
      job: 'Password change',
      avatarColor: 'bg-yellow-100',
      actionType: 'Sign Up',
      actionColor: 'bg-green-100 text-green-500',
    },
    {
      id: 3,
      name: 'Jenny Wilson',
      time: '10 mins ago',
      action: 'applied for the job',
      job: 'Frontend Engineer',
      avatarColor: 'bg-blue-100',
      actionType: 'Applying',
      actionColor: 'bg-blue-100 text-blue-500',
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activity Feed</h2>
        <span className="text-gray-500 text-sm flex items-center space-x-1">Latest Activity</span>
      </div>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.avatarColor}`}>
                <span className="text-3xl">🧑‍💻</span> {/* Use an emoji or avatar image */}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{activity.name}</span> {activity.action}{' '}
                  <span className="font-semibold">{activity.job}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
            {/* Action Label */}
            <span
              className={`text-sm px-3 py-1 text-center rounded-md w-24 ${activity.actionColor} font-medium`}
            >
              {activity.actionType}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
