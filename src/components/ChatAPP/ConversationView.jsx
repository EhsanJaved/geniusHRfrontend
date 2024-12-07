import React, { useState, useEffect, useRef } from 'react';
import MessageInput from './MessageInput';

const ConversationView = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [otherUserName, setOtherUserName] = useState('');
  const messageEndRef = useRef(null);

  // Effect for setting user ID and other user name
  useEffect(() => {
    if (!conversation) return;

    const userdata = localStorage.getItem('user');
    const user = JSON.parse(userdata);
    const loggedInUserId = user.id;
    setUserId(Number(loggedInUserId));

    // Determine the other user's name
    if (conversation.other_user) {
      setOtherUserName(conversation.other_user);
    } else if (conversation.user1.id === Number(loggedInUserId)) {
      setOtherUserName(conversation.user2.username);
    } else {
      setOtherUserName(conversation.user1.username);
    }
  }, [conversation]);

  // Effect for fetching messages
  useEffect(() => {
    if (!conversation) return;

    fetch(`http://127.0.0.1:8000/api/conversation/${conversation.id}/messages/`, {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [conversation]);

  // Effect for scrolling to the bottom of the chat
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!conversation) {
    return <div className="flex items-center justify-center h-full">Select a conversation</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header with other user's name */}
      <div className="p-4 bg-gray-100 border-b text-xl font-semibold">
        {otherUserName}
      </div>

      {/* Message list */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => {
          const isUserMessage = message.sender === userId;
          return (
            <div
              key={message.id}
              className={`flex items-start my-2 ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`p-3 rounded-lg max-w-xs break-words ${isUserMessage ? 'bg-blue-200' : 'bg-gray-200'}`}>
                <div>{message.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(message.created_at)}
                </div>
                <div className={`text-xs mt-1 ${message.seen ? 'text-green-500' : 'text-red-500'}`}>
                  {message.seen ? 'Seen' : 'Not Seen'}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Message input */}
      <div className="p-2 bg-white border-t">
        <MessageInput
          conversationId={conversation.id}
          onNewMessage={(msg) => setMessages((prevMessages) => [...prevMessages, msg])}
        />
      </div>
    </div>
  );
};

export default ConversationView;
                                                  