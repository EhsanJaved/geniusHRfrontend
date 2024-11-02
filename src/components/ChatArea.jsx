import React from 'react';
import { FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane } from 'react-icons/fa';

const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Chukuemeka" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h2 className="font-semibold">Chukuemeka</h2>
            <p className="text-sm text-green-500">Available</p>
          </div>
        </div>
        
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">10:07 AM</span>
          <p className="bg-gray-100 p-3 rounded-lg max-w-sm">Hi, how are you today?</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">10:07 AM</span>
          <p className="bg-blue-500 text-white p-3 rounded-lg max-w-sm">I'll need those reports by 3 PM, please.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">10:07 AM</span>
          <p className="bg-blue-500 text-white p-3 rounded-lg max-w-sm">Also, I hope you had a chance to review the project updates.</p>
        </div>
      </div>

      {/* Message input */}
      <div className="flex items-center p-4 border-t border-gray-200">
        {/* <button className="text-gray-500 mr-4">
          <FaPaperclip />
        </button> */}
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
        />
        {/* <button className="text-gray-500 mx-4">
          <FaSmile />
        </button> */}
        {/* <button className="text-gray-500">
          <FaMicrophone />
        </button> */}
        <button className="text-blue-500 ml-4">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
