import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../shared/Navbar';

function BorrowerDashboard() {
  const userRole = localStorage.getItem('userRole');

  if (!userRole || userRole !== 'borrower') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar userRole="borrower" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default BorrowerDashboard; 