import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar({ userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  const borrowerLinks = [
    { path: '/borrower/apply', label: 'Loan Application' },
    { path: '/borrower/calculator', label: 'EMI Calculator' },
    { path: '/borrower/help', label: 'Help' }
  ];

  const officerLinks = [
    { path: '/officer', label: 'Dashboard' }
  ];

  const links = userRole === 'borrower' ? borrowerLinks : officerLinks;

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {links.map((link) => (
            <Button
              key={link.path}
              color="primary"
              onClick={() => navigate(link.path)}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: isActive(link.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
                ...(!isMobile && {
                  minWidth: 120
                })
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <IconButton
          color="primary"
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 