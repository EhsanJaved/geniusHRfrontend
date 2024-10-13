import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Add useNavigate and Routes
import './App.css';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import MainLogo from './assets/Logo1.svg';
import LoginPage from './components/Login'; // Import the LoginPage component

function App() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleLogin = (email, password) => {
    // For simplicity, assume login is successful
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true); // Set the user as authenticated
      return true; // Return true for successful login
    } else {
      alert('Invalid credentials');
      return false; // Return false for failed login
    }
  };

  return (
    <Routes>
      {/* Route for the login page */}
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

      {/* Protected Route for the dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className="flex">
              <Sidebar MainLogo={MainLogo} setselected={setSelectedItem} />
              <div className="flex-1 bg-gray-50">
                <TopBar selected={selectedItem} />
                <Dashboard />
              </div>
            </div>
          ) : (
            <LoginPage onLogin={handleLogin} /> // Redirect to login if not authenticated
          )
        }
      />
    </Routes>
  );
}

export default App;
