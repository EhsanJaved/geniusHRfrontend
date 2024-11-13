import React, { useState } from 'react';
import { GrSend } from "react-icons/gr";
const MessageInput = ({ conversationId, onNewMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      fetch(`http://127.0.0.1:8000/api/conversation/${conversationId}/message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          onNewMessage(data);
          setMessage('');
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white flex items-center space-x-4">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
      >
        <GrSend/>
      </button>
    </div>
  );
};

export default MessageInput;
