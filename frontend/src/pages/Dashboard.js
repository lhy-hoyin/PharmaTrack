import React from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const DashboardPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;