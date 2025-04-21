import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import logo from '../assets/newlogo.png';

const Header = ({ onLogout, darkMode, onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box 
          component="img"
          src={logo}
          alt="RiskSense Logo"
          sx={{
            height: isMobile ? '30px' : '40px',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/'}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="primary"
            href="/dashboard"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(10, 77, 140, 0.08)',
              },
            }}
          >
            Dashboard
          </Button>
          
          <Button
            color="primary"
            href="/apply"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(10, 77, 140, 0.08)',
              },
            }}
          >
            Apply for Loan
          </Button>
          
          <Button
            color="primary"
            href="/calculator"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(10, 77, 140, 0.08)',
              },
            }}
          >
            Loan Calculator
          </Button>

          <IconButton 
            onClick={onToggleTheme}
            sx={{ ml: 1, color: 'text.primary' }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {onLogout && (
            <Button
              variant="outlined"
              color="primary"
              onClick={onLogout}
              sx={{
                ml: 2,
                borderColor: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(10, 77, 140, 0.08)',
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 