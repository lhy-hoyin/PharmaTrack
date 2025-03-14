import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Sidebar from '../components/Sidebar.js';
import "./Dashboard.css";

const Dashboard = () => {
  const { logout } = useAuth();
  const [content, displayContentOf] = useState('stock-monitor');
  
  const renderContent = () => {
    switch (content) {
      case 'create-order':
        return <div>Create order</div>;
      case 'approve-orders':  
        return <div>Approve orders</div>;
      case 'view-orders':
        return <div>View orders</div>;

      case 'stock-monitor':
        return <div>Stock Monitor</div>;
      case 'stock-history':
        return <div>Stock History Log</div>;

      case 'view-prescription':
        return <div>View Prescription</div>;  
      case 'prescription-history':
        return <div>Prescriptions History Log</div>;

      default: return <div />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <a href="/dashhboard"><img src="FIXME.png" /></a>
        <Button onClick={logout} colorScheme="teal">Logout</Button>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
        <Sidebar selectContent={displayContentOf} />
        </div>
        <div className="dashboard-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;