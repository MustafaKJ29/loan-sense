import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BorrowerDashboard from './components/borrower/Dashboard';
import LoanApplication from './components/borrower/LoanApplication';
import EMICalculator from './components/borrower/EMICalculator';
import Help from './components/borrower/Help';
import OfficerDashboard from './components/officer/Dashboard';
import Login from './components/Login';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Borrower Routes */}
          <Route path="/borrower" element={<BorrowerDashboard />}>
            <Route path="apply" element={<LoanApplication />} />
            <Route path="calculator" element={<EMICalculator />} />
            <Route path="help" element={<Help />} />
            <Route index element={<Navigate to="apply" replace />} />
          </Route>

          {/* Officer Routes */}
          <Route path="/officer" element={<OfficerDashboard />} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
