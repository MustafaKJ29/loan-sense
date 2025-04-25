import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  marginLeft: theme.spacing(2),
  '&.active': {
    backgroundColor: theme.palette.primary.dark,
  }
}));

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LoanSense
        </Typography>
        <Box>
          {userRole === 'borrower' ? (
            <>
              <StyledButton
                component={RouterLink}
                to="/calculator"
                className={location.pathname === '/calculator' ? 'active' : ''}
              >
                Loan Calculator
              </StyledButton>
              <StyledButton
                component={RouterLink}
                to="/comparison"
                className={location.pathname === '/comparison' ? 'active' : ''}
              >
                Compare Loans
              </StyledButton>
            </>
          ) : (
            <StyledButton
              component={RouterLink}
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Dashboard
            </StyledButton>
          )}
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 2 }}
            title="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 