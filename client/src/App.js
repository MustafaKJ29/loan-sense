import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Components
import Login from './components/Login';
import BorrowerDashboard from './components/borrower/Dashboard';
import LoanApplication from './components/borrower/LoanApplication';
import EMICalculator from './components/borrower/EMICalculator';
import FAQ from './components/borrower/FAQ';
import OfficerDashboard from './components/officer/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/borrower" element={<BorrowerDashboard />}>
            <Route path="apply" element={<LoanApplication />} />
            <Route path="calculator" element={<EMICalculator />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
