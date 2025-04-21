import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Calculate as CalculateIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

function Navbar({ userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const borrowerLinks = [
    { path: '/borrower', icon: <HomeIcon />, label: 'Home' },
    { path: '/borrower/apply', icon: <DashboardIcon />, label: 'Apply for Loan' },
    { path: '/borrower/calculator', icon: <CalculateIcon />, label: 'Loan Calculator' },
    { path: '/borrower/faq', icon: <QuestionAnswerIcon />, label: 'FAQ' },
  ];

  const officerLinks = [
    { path: '/officer', icon: <DashboardIcon />, label: 'Dashboard' },
  ];

  const links = userRole === 'borrower' ? borrowerLinks : officerLinks;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          LOANSENSE
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {links.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              startIcon={link.icon}
              onClick={() => navigate(link.path)}
              sx={{
                backgroundColor: location.pathname === link.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 