import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProImage from '../assets/blank-profile.png';
import msg from '../assets/msgDot.svg';
import bell from '../assets/bellDot.svg';
import drop from '../assets/arrow_drop_down.svg';
import logout from '../assets/logout.svg';
import setting from '../assets/setting.svg';

const TopBar = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const User = props.User;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = User.id;
    
        const response = await axios.get('http://localhost:8000/api/conversations/', {
          headers: {
            'Authorization': `token ${token}`,
          },
        });
    
        const data = response.data;
        // Filter and format the data to include only unseen messages from the other person
        const filteredConversations = data
          .map((conversation) => {
            // Filter unseen messages from the other user
            const unseenMsgs = conversation.messages.filter(
              (message) => !message.seen && message.sender !== userId
            );
            return { ...conversation, unseenMsgs };
          })
          .filter((conversation) => conversation.unseenMsgs.length > 0); // Only keep conversations with unseen messages
    
        setConversations(filteredConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();  // Fetch conversations as soon as the component mounts
  }, [User.id]);  // Depend on User.id so it fetches when the user data changes

  // Calculate the total number of unseen messages
  const getUnseenMessageCount = () => {
    return conversations.reduce((total, conversation) => total + conversation.unseenMsgs.length, 0);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMsgOpen(false);
  };

  const toggleMsgDropdown = () => {
    setIsMsgOpen(!isMsgOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setIsProfileOpen(false);
  };

  return (
    <div className='px-3 py-2'>
      <div className="my-5 flex h-20 items-center justify-between px-9 relative w-full bg-white shadow-lg">
        <div>
          <h1 className="text-xl font-bold selected-efect-3d cursor-default">
            Welcome back, {User.name} <span className='effect-3d'>🌟</span>
          </h1>
        </div>
        <div className="flex items-center">
          {/* Message Icon with Badge for Unseen Messages */}
          <div className="relative">
            <img
              src={msg}
              alt="msgs"
              className='w-10 h-10 cursor-pointer'
              onClick={toggleMsgDropdown}
            />
            {getUnseenMessageCount() > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {getUnseenMessageCount()}
              </span>
            )}
            {isMsgOpen && (
              <div className="absolute right-0 mt-4 w-64 p-4 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition duration-300 ease-in-out transform">
                <h3 className="font-bold text-gray-800 mb-2">Unseen Messages</h3>
                {conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <Link to='/dashboard/messages '>
                    <div key={conversation.id} className="text-gray-600 mb-3">
                      {/* <div className="font-semibold">{conversation.other_user}</div> */}
                      {conversation.unseenMsgs.map((message) => (
                        <p key={message.id} className="hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer">
                          {message.content} <br />
                          <span className="text-xs text-gray-500">from {conversation.other_user}</span>
                        </p>
                      ))}
                    </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600">No new messages.</p>
                )}
              </div>
            )}
          </div>

          <img src={bell} alt="notifications" className='w-10 h-10 cursor-pointer' />

          <div className="mr-4 flex flex-col">
            <div className='text-gray-700 font-bold selected-efect-3d'>{User.name}</div>
            <div className='text-gray-500 flex flex-row-reverse selected-efect-3d'>{User.role}</div>
          </div>

          {/* Profile and Dropdown Button */}
          <div className="relative">
            <button onClick={toggleProfileDropdown} className="flex items-center">
              <img
                src={User?.pic || ProImage}
                alt="Profile"
                className="w-12 h-12 rounded-full drop-shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ProImage;
                }}
              />
              <img src={drop} alt="dropdown arrow" className='ml-2 w-5 h-5' />
            </button>

            {isProfileOpen && (
              <div className="absolute -right-9 mt-4 w-48 p-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition duration-300 ease-in-out">
                <div className="py-1">
                  <Link to="/dashboard/settings" onClick={() => setIsProfileOpen(false)}>
                    <button className="flex items-center px-10 py-3 rounded-lg font-bold transition duration-300 ease-in-out text-gray-600 hover:text-white hover:bg-blue-500 hover:shadow-inner hover:shadow-slate-700">
                      <img src={setting} alt="Settings" className="transition duration-300 ease-in-out filter invert" />
                      <span className="ml-4">Settings</span>
                    </button>
                  </Link>
                  <Link to="/" onClick={handleLogout}>
                    <button className="flex items-center px-10 py-3 rounded-lg font-bold transition duration-300 ease-in-out text-gray-600 hover:text-white hover:bg-red-600 hover:shadow-inner hover:shadow-slate-700">
                      <img src={logout} alt="Logout" className="transition duration-300 ease-in-out" />
                      <span className="ml-4">Logout</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
