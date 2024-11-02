import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Calendar from './components/Calendar';
import Payroll from './components/Payroll';
import Employees from './components/Employees';
import Candidates from './components/Candidates';
import Jobs from './components/Jobs';
import MeetingsPage from './components/Meeting';
import LoginPage from './components/Login';
import SettingsPage from './components/Settings';
import AttendancePage from './components/Attendance';
import DepartmentManagementPage from './components/departments';

import { menuItemsForAdmin, menuItemsForHRAdmin, menuItemsForEmployees, menuItemsForManager } from './components/fregments/MenuContent';

import MainLogo from './assets/Logo1.svg';
import profilePicEhsan from './assets/profile-pic.png';

function App() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to determine the menu based on user role
  const getMenuItems = () => {
    if (user?.role === 'Admin') return menuItemsForAdmin;
    if (user?.role === 'HR Admin') return menuItemsForHRAdmin;
    if (user?.role === 'Manager') return menuItemsForManager;
    return menuItemsForEmployees;
  };

  const handleLogin = async (username, password) => {
    const url = 'http://localhost:8000/emp/login/';
    try {
      const response = await axios.post(url, { username, password });
      if (response.data.token) {
        const profilePicUrl = response.data.Picture 
          ? `http://localhost:8000${response.data.Picture}` 
          : profilePicEhsan;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user_id,
          name: response.data.user_name,
          role: response.data.role,
          pic: profilePicUrl,
        }));
        console.log(response.data.token);
        
        setIsAuthenticated(true);
        setUser({
          id: response.data.user_id,
          name: response.data.user_name,
          role: response.data.role,
          pic: profilePicUrl,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      // Optionally check if the token is valid by making a request to your API
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage onLogin={handleLogin} MainLogo={MainLogo} />}
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className="flex">
              <Sidebar
                MainLogo={MainLogo}
                setselected={setSelectedItem}
                menuItems={getMenuItems()}
              />
              <div className="flex-1 bg-gray-50">
                <TopBar selected={selectedItem} User={user} />
                <Outlet /> {/* Placeholder for nested routes */}
              </div>
            </div>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="meeting" element={<MeetingsPage />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="employees" element={<Employees />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="department" element={<DepartmentManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App;
