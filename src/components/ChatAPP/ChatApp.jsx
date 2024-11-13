import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ConversationView from './ConversationView';

const ChatApp = () => {
  const [activeConversation, setActiveConversation] = useState(null);

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
  };

  return (
  <>
   <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Message</h1>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 border-r border-gray-300">
        <Sidebar onSelectConversation={handleConversationClick} />
      </div>

      {/* Main Conversation View */}
      <div className="w-2/3">
        <ConversationView conversation={activeConversation} />
      </div>
    </div>
  </>
  );
};

export default ChatApp;
