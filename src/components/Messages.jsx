import React from 'react';
import ChatSidebar from './ChatSidebar.jsx';
import ChatArea from './ChatArea.jsx';
export default function Messages() {
  return (
    <>
     <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Messages</h1>
    <div className="flex  h-screen bg-gray-100">
      <ChatSidebar />
      <ChatArea />
    </div>
    </>
  )
}
