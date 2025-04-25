import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpIcon from '@mui/icons-material/Help';
import ListAltIcon from '@mui/icons-material/ListAlt';

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const menuItems = [
    {
      title: 'Loan Calculator',
      description: 'Calculate your monthly payments and total interest',
      icon: <CalculateIcon fontSize="large" />,
      path: '/borrower/calculator',
      color: '#1976d2'
    },
    {
      title: 'Apply for Loan',
      description: 'Submit a new loan application',
      icon: <AssignmentIcon fontSize="large" />,
      path: '/borrower/apply',
      color: '#2e7d32'
    },
    {
      title: 'Loan Status',
      description: 'Check your loan application status',
      icon: <ListAltIcon fontSize="large" />,
      path: '/borrower/status',
      color: '#9c27b0'
    },
    {
      title: 'Help Center',
      description: 'Get answers to common questions',
      icon: <HelpIcon fontSize="large" />,
      path: '/borrower/help',
      color: '#ed6c02'
    }
  ];

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          What would you like to do today?
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: item.color, mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 