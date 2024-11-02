import React from 'react';
import { FaHashtag } from 'react-icons/fa';

const ChatSidebar = () => {
  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Group chats</h2>
      
      {/* Group chats */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <FaHashtag className="mr-2 text-gray-500" />
            <span>HR Announcement</span>
          </div>
          <span className="text-sm text-gray-400">10:07 AM</span>
        </div>
        <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <FaHashtag className="mr-2 text-gray-500" />
            <span>Design Team</span>
          </div>
          <span className="text-sm text-gray-400">10:07 AM</span>
        </div>
        <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <FaHashtag className="mr-2 text-gray-500" />
            <span>Dev Team</span>
          </div>
          <span className="text-sm text-gray-400">10:07 AM</span>
        </div>
      </div>

      {/* Pinned messages */}
      <h3 className="text-lg font-semibold mb-4">All Contact</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <img src="https://via.placeholder.com/40" alt="Aisha Doe" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-medium">Aisha Doe</p>
              {/* <p className="text-sm text-gray-500">Sure, I'll get them to you on time...</p> */}
            </div>
          </div>
          {/* <span className="text-sm text-gray-400">10:07 AM</span> */}
        </div>
        {/* Add more pinned messages here */}
      </div>
    </div>
  );
};

export default ChatSidebar;
