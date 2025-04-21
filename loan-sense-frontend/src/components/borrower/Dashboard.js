import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../shared/Navbar';

function Dashboard() {
  const userRole = localStorage.getItem('userRole');

  if (!userRole || userRole !== 'borrower') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar userRole="borrower" />
      <Box sx={{ p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard; 