import React from 'react';
import profilePic from '../assets/profile-pic.png'
import msg from '../assets/msgDot.svg'
import bell from '../assets/bellDot.svg'
import drop from '../assets/arrow_drop_down.svg'
const TopBar = () => {
  return (
    <div className='px-3 py-2'>
    <div className="
     my-5 flex h-20 items-center justify-between px-9 relative w-full bg-white shadow-lg
    ">
      <div>
        <h1 className="text-xl font-bold selected-efect-3d cursor-default">Welcome back, Ehsan Javed <span className='effect-3d'>🌟</span></h1>
      </div>
      <div className="flex items-center ">
      <img src={msg} 
      alt="msgs"
      className='w-10 h-10'
      />
      <img src={bell} 
      alt="msgs"
      className='w-10 h-10'
      />
        {/* Name position */}
        <div className="mr-4 flex flex-col">
        <div className='text-gray-700 font-bold selected-efect-3d'>
        Ehsan Javed
        </div>
        <div className=' text-gray-500 flex flex-row-reverse selected-efect-3d'>
        HR Admin
        </div>
        </div>
        <img
          src={profilePic}
                    alt="Profile"
          className="w-12 h-12 rounded-full drop-shadow-lg"
        />
        <img src={drop} 
        alt="drop down arrow"
        className='ml-2'
        />
      </div>
    </div>
    </div>
  );
};

export default TopBar;
