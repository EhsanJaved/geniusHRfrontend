import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import MainLogo from './assets/Logo1.svg';
import LoginPage from './components/Login'; // Import the LoginPage component

// icons importing 
import message from './assets/message.svg';
import calendar from './assets/calendar.svg';
import dashboard from './assets/dashboard.svg';
import employee from './assets/employee.svg';
import meeting from './assets/meeting.svg';
import payroll from './assets/payroll.svg';
import job from './assets/job.svg';
import profilePicEhsan from './assets/profile-pic.png';
import profilePicRehman from './assets/profile-pic-user.jpg';

function App() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially not authenticated
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Define menu items for different users
  const menuItemsForUser1 = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Message', icon: message, link: '/messages' },
    { name: 'Meeting', icon: meeting, link: '/meeting' },
    { name: 'Calendar', icon: calendar, link: '/calendar' },
    { name: 'Payroll', icon: payroll, link: '/payroll' },
    { name: 'Candidates', icon: employee, link: '/candidates' },
    { name: 'Employees', icon: employee, link: '/employees' },
    { name: 'Jobs', icon: job, link: '/jobs' },
  ];

  const menuItemsForEmployees = [
    { name: 'Dashboard', icon: dashboard, link: '/dashboard' },
    { name: 'Attendance', icon: message, link: '/messages' },
    { name: 'Message', icon: message, link: '/messages' },
    { name: 'Calendar', icon: calendar, link: '/calendar' },
    { name: 'Payroll', icon: payroll, link: '/payroll' },
  ];

  // Handle user login
  const handleLogin = (email, password) => {
    // Simple authentication check
    if (email === 'admin@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ id: 1, name: 'Ehsan Javed', role: 'HR Admin', pic:profilePicEhsan }); // Set user ID or role
      return true;
    } else if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ id: 2, name: 'Rehman Chohan', role: 'Employee', pic: profilePicRehman }); // Different user ID or role
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  };

  // useEffect to handle redirection based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to dashboard if authenticated
    } else {
      navigate('/'); // Navigate to login if not authenticated
    }
  }, [isAuthenticated, navigate]); // Run this effect when authentication status changes

  return (
    <Routes>
      {/* Route for the login page */}
      <Route
        path="/"
        element={<LoginPage onLogin={handleLogin} MainLogo={MainLogo} />}
      />

      {/* Protected Route for the dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className="flex">
              <Sidebar
                MainLogo={MainLogo}
                setselected={setSelectedItem}
                menuItems={user?.id === 1 ? menuItemsForUser1 : menuItemsForEmployees} // Show different menu based on user ID
              />
              <div className="flex-1 bg-gray-50">
                <TopBar
                selected={selectedItem}
                User={user}
                />
                <Dashboard />
              </div>
            </div>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
    </Routes>
  );
}

export default App;
