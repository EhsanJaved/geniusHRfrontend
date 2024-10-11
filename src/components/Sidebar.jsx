import React, { useState } from 'react';
import icon1 from '../assets/message.svg';

const Sidebar = (props) => {
  // State to track active menu item
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleMenuItemClick = (item) => {
    setActiveItem(item); // Set the clicked item as active
  };

  const menuItems = [
    { name: 'Dashboard' },
    { name: 'Message', icon: icon1 },
    { name: 'Meeting' },
    { name: 'Calendar' },
    { name: 'Training and Development' },
    { name: 'Payroll' },
    { name: 'Employee' },
    { name: 'Jobs' },
    { name: 'Candidates' },
    { name: 'Company Website' },
    { name: 'Settings' }
  ];

  return (
    <div className="w-auto bg-white shadow-lg">
      <div className="p-3">
        <img src={props.MainLogo} alt="Logo" />
        <ul>
          {/* <h2 className="font-bold flex my-7">MENU</h2> */}
          {menuItems.map((item, index) => (
            <li className="m-2" key={index}>
              <a
                href="#"
                className={`flex items-center px-4 py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
                  activeItem === item.name
                    ? 'bg-blue-500 text-white shadow-inner selected-efect-3d translate-x-1 shadow-slate-700' // Active item styles
                    : ' text-gray-600 font-bold flex items-center px-4 py-3 rounded-lg hover:text-white hover:shadow-inner transition duration-300 ease-in-out hover:bg-blue-500 hover:translate-x-1 effect-3d hover:shadow-slate-700 ' // Hover styles
                }`}
                onClick={() => handleMenuItemClick(item.name)} // Set item as active on click
              >
                {item.icon && <img src={item.icon} alt={item.name} />} {/* Optional Icon */}
                <span className="ml-4">{item.name}</span>
              </a>
            </li>
          ))}
          <li className="m-2 mt-9 ">
             <a 
              href="#" 
              className="bg-white justify-center text-red-700  font-bold flex items-center  px-4 py-3 rounded-lg hover:shadow-slate-700 hover:shadow-inner transition duration-300 ease-in-out hover:bg-red-700 hover:text-white hover:translate-x-1"
            >
              <span className="ml-4">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
