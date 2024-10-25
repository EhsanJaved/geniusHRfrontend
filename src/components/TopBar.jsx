import React, { useState } from 'react';
import profilePic from '../assets/profile-pic.png';
import msg from '../assets/msgDot.svg';
import bell from '../assets/bellDot.svg';
import drop from '../assets/arrow_drop_down.svg';
import logout from '../assets/logout.svg';
import setting from '../assets/setting.svg';
const TopBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

const User =  props.User;
console.log(User);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div className='px-3 py-2'>
        <div className="my-5 flex h-20 items-center justify-between px-9 relative w-full bg-white shadow-lg">
          <div>
            <h1 className="text-xl font-bold selected-efect-3d cursor-default">
              Welcome back, {User.name} <span className='effect-3d'>🌟</span>
            </h1>
          </div>
          <div className="flex items-center">
            <img src={msg} alt="msgs" className='w-10 h-10' />
            <img src={bell} alt="notifications" className='w-10 h-10' />

            <div className="mr-4 flex flex-col">
              <div className='text-gray-700 font-bold selected-efect-3d'>{User.name}</div>
              <div className='text-gray-500 flex flex-row-reverse selected-efect-3d'>{User.role}</div>
            </div>

            {/* Profile and Dropdown Button */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center">
                <img src={User.pic} alt="Profile" className="w-12 h-12 rounded-full drop-shadow-lg" />
                <img src={drop} alt="dropdown arrow" className='ml-2 w-5 h-5' />
              </button>

              {isOpen && (
                <div className="absolute -right-9 mt-4 w-48 p-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                  <a href="#" onClick={() => handleItemClick('Option 4')} className="flex items-center px-10 py-3 rounded-lg font-bold transition duration-300 ease-in-out text-gray-600  hover:text-white hover:bg-blue-500 hover:shadow-inner hover:shadow-slate-700">
              <img src={setting} alt="Logout" className="transition duration-300 ease-in-out filter invert" />
              <span className="ml-4">Settings</span>
            </a>
                    <a href="#" onClick={() => handleItemClick('Option 3')} className="bg-white justify-center text-red-700 font-bold flex items-center px-4 py-3 rounded-lg hover:shadow-slate-700 hover:shadow-inner transition duration-300 ease-in-out hover:bg-red-500 hover:text-white">
              <img src={logout} alt="Logout" className="transition duration-300 ease-in-out" />
              <span className="ml-4">Logout</span>
            </a>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Name of Dashboard */}
      <div className='font-bold pl-12 pb-4 text-2xl selected-efect-3d'> {props.selected}</div>
    </>
  );
};

export default TopBar;
