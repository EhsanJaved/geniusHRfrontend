import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Messages from './components/ChatAPP/ChatApp';
import Calendar from './components/Calendar';
import Payroll from './components/Payroll';
import Employees from './components/Employees';
import Candidates from './components/Candidates';
import Jobs from './components/Jobs/Jobs';
import MeetingsPage from './components/Meetings/Meeting';
import LoginPage from './components/Login';
import SettingsPage from './components/settings/Settings';
import AttendancePage from './components/my/myAttendance/Attendance';
import DepartmentManagementPage from './components/departments';
import ApplicationsPage from './components/applications/ApplicationsPage';
import { menuItemsForAdmin, menuItemsForHRAdmin, menuItemsForEmployees, menuItemsForManager, menuItemsForHR } from './components/fregments/MenuContent';
 
import MainLogo from './assets/Logo1.svg';
import emptyProfile from './assets/blank-profile.png';
import MyApplicationsPage from './components/my/myApplications/ApplicationsPage';
import Attendance from './components/attendance/Attendance';

function App() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (user?.role === 'Admin') return menuItemsForAdmin;
    if (user?.role === 'HR Admin') return menuItemsForHRAdmin;
    if (user?.role === 'HR') return menuItemsForHR;
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
          : emptyProfile;
  
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user_id)
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user_id,
          name: response.data.user_name,
          role: response.data.role,
          pic: profilePicUrl, 
        }));
        
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
    }
  }, []);

  return (
    <Routes >
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
                <TopBar selected={selectedItem} User={user} unseenCount={unseenCount} />
                <Outlet />
              </div>
            </div>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="messages" element={<Messages  />} />
        <Route path="meeting" element={<MeetingsPage />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="employees" element={<Employees />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="department" element={<DepartmentManagementPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="Attendance" element={<Attendance/>} />
        <Route path="myattendance" element={<AttendancePage />} />
        <Route path="myapplications" element={<MyApplicationsPage />} />
        <Route path="mypayroll" element={<Payroll />} />
      </Route>
    </Routes>
  );
}

export default App;
