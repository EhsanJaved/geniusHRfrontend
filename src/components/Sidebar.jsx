import React, { useState } from 'react';
import message from '../assets/message.svg';
import calendar from '../assets/calendar.svg';
import companyWebsite from '../assets/compnayWebsite.svg';
import dashboard from '../assets/dashboard.svg';
import employee from '../assets/employee.svg';
import meeting from '../assets/meeting.svg';
import payroll from '../assets/payroll.svg';
import setting from '../assets/setting.svg';
import job from '../assets/job.svg';
import logout from '../assets/logout.svg';
import TrainingAndDevelopment from '../assets/TrainingAndDevelopment.svg';

const Sidebar = ({ MainLogo,  setselected }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const handleMenuItemClick = (item) => {
    setselected(item.name);
    setActiveItem(item.name);
  };

  const menuItems = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Message', icon: message, link: '/messages' },
    { name: 'Meeting', icon: meeting, link: '/meeting' },
    { name: 'Calendar', icon: calendar, link: '/calendar' },
    { name: 'Training and Development', icon: TrainingAndDevelopment, link: '/t&d' },
    { name: 'Payroll', icon: payroll, link: '/payroll' },
    { name: 'Employee', icon: employee, link: '/employees' },
    { name: 'Jobs', icon: job, link: '/jobs' },
    { name: 'Candidates', icon: employee, link: '/candidates' },
    { name: 'Company Website', icon: companyWebsite, link: '/companywebsite' },
    { name: 'Settings', icon: setting, link: '/settings' },
  ];

  return (
    <div className="w-auto bg-white shadow-lg">
      <div className="p-3 flex items-center flex-col">
        <img src={MainLogo} alt="Logo" />
        <ul>
          {menuItems.map((item, index) => (
            <li className="m-2" key={index}>
              <a
                href="#"
                className={`flex items-center px-4 py-3 rounded-lg font-bold transition duration-300 ease-in-out ${
                  activeItem === item.name
                    ? 'bg-blue-500 text-white shadow-inner selected-efect-3d translate-x-1 shadow-slate-700' // Active item styles
                    : 'text-gray-600 hover:text-white hover:bg-blue-500 hover:translate-x-1 hover:shadow-inner hover:shadow-slate-700' // Hover styles
                }`}
                onClick={() => handleMenuItemClick(item)} // Set item as active on click
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`transition duration-300 ease-in-out ${
                      activeItem !== item.name ? 'filter invert' : ''
                    } hover:invert`} // Add hover effect for icon color
                  />
                )}
                <span className="ml-4">{item.name}</span>
              </a>
            </li>
          ))}
          <li className="m-2 mt-9">
            <a
              href="#"
              className="bg-white justify-center text-red-700 font-bold flex items-center px-4 py-3 rounded-lg hover:shadow-slate-700 hover:shadow-inner transition duration-300 ease-in-out hover:bg-red-700 hover:text-white hover:translate-x-1"
            >
              <img src={logout} alt="Logout" className="transition duration-300 ease-in-out hover:invert" />
              <span className="ml-4">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
