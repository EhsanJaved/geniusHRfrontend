import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ MainLogo, menuItems, setselected }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const handleMenuItemClick = (item) => {
    setselected(item.name);
    setActiveItem(item.name);
  };

  return (
    <div className="min-w-64 bg-white shadow-lg">
      <div className="p-3 flex items-center flex-col min-w-64">
        <img src={MainLogo} alt="Logo" />
        <ul>
          {menuItems.map((item, index) => (
            <li className="m-2" key={index}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
                  activeItem === item.name
                    ? 'bg-blue-500 px-10 text-white shadow-inner selected-efect-3d translate-x-1 shadow-slate-700' // Active item styles
                    : 'text-gray-600 px-10 hover:text-white hover:bg-blue-500 hover:translate-x-1 hover:shadow-inner hover:shadow-slate-700' // Hover styles
                }`}
                onClick={() => handleMenuItemClick(item)} 
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`transition duration-300 ease-in-out ${
                      activeItem !== item.name ? 'filter invert' : ''
                    }`}
                  />
                )}
                <span className="ml-4">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
