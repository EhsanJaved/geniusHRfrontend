import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ MainLogo, menuItems, setselected }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expandedSection, setExpandedSection] = useState(null); // Track expanded sections

  const handleMenuItemClick = (item) => {
    setselected(item.name);
    setActiveItem(item.name);
  };

  const toggleSection = (groupName) => {
    setExpandedSection(expandedSection === groupName ? null : groupName);
  };

  return (
    <div className="min-w-64 bg-white shadow-lg">
      <div className="p-3 flex items-center flex-col min-w-64">
        <img src={MainLogo} alt="Logo" />
        <ul>
          {menuItems.map((item, index) =>
            item.group ? (
              // Grouped items
              <li key={index} className="m-2">
                <div
                  className={`cursor-pointer px-4 py-3 rounded-lg font-bold ${
                    expandedSection === item.group
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-white hover:bg-blue-500'
                  }`}
                  onClick={() => toggleSection(item.group)}
                >
                  {item.group}
                </div>
                {expandedSection === item.group && (
                  <ul className="ml-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="m-2">
                        <Link
                          to={subItem.link}
                          className={`flex items-center px-4 py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
                            activeItem === subItem.name
                              ? 'bg-blue-500 px-10 text-white shadow-inner selected-efect-3d translate-x-1 shadow-slate-700'
                              : 'text-gray-600 px-10 hover:text-white hover:bg-blue-500 hover:translate-x-1 hover:shadow-inner hover:shadow-slate-700'
                          }`}
                          onClick={() => handleMenuItemClick(subItem)}
                        >
                          {subItem.icon && (
                            <img
                              src={subItem.icon}
                              alt={subItem.name}
                              className={`transition duration-300 ease-in-out ${
                                activeItem !== subItem.name ? 'filter invert' : ''
                              }`}
                            />
                          )}
                          <span className="ml-4">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              // Regular items
              <li key={index} className="m-2">
                <Link
                  to={item.link}
                  className={`flex items-center px-4 py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
                    activeItem === item.name
                      ? 'bg-blue-500 px-10 text-white shadow-inner selected-efect-3d translate-x-1 shadow-slate-700'
                      : 'text-gray-600 px-10 hover:text-white hover:bg-blue-500 hover:translate-x-1 hover:shadow-inner hover:shadow-slate-700'
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
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
