import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Box } from '@mui/material';

// Auth Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

// Protected Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Borrower Components
import BorrowerDashboard from './components/borrower/Dashboard';
import LoanApplication from './components/borrower/LoanApplication';
import EMICalculator from './components/borrower/EMICalculator';
import HelpCenter from './components/borrower/HelpCenter';
import LoanStatus from './components/borrower/LoanStatus';

// Officer Components
import OfficerDashboard from './components/officer/Dashboard';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
        <Footer />
      </Box>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Borrower Routes */}
            <Route path="/borrower" element={<BorrowerDashboard />} />
            <Route path="/borrower/apply" element={<LoanApplication />} />
            <Route path="/borrower/calculator" element={<EMICalculator />} />
            <Route path="/borrower/help" element={<HelpCenter />} />
            <Route path="/borrower/status" element={<LoanStatus />} />

            {/* Officer Routes */}
            <Route path="/officer" element={<OfficerDashboard />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
