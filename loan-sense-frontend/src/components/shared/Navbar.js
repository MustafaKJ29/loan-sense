import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userRole = currentUser?.role;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const borrowerLinks = [
    { path: '/borrower', label: 'Dashboard' },
    { path: '/borrower/apply', label: 'Apply for Loan' },
    { path: '/borrower/calculator', label: 'Loan Calculator' },
    { path: '/borrower/status', label: 'Loan Status' },
    { path: '/borrower/help', label: 'Help' },
  ];

  const officerLinks = [
    { path: '/officer', label: 'Dashboard' },
  ];

  const links = userRole === 'borrower' ? borrowerLinks : officerLinks;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate(userRole === 'borrower' ? '/borrower' : '/officer')}
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LoanSense
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map((link) => (
            <Button
              key={link.path}
              color={isActive(link.path) ? 'secondary' : 'inherit'}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </Button>
          ))}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {currentUser?.email?.[0]?.toUpperCase()}
            </Avatar>
            <IconButton color="inherit" onClick={handleLogout} title="Logout">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 