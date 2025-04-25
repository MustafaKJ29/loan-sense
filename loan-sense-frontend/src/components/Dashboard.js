import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { AccountBalance, TrendingUp, Assessment, Timeline } from '@mui/icons-material';

function Dashboard() {
  const cards = [
    {
      title: 'Active Loans',
      value: '3',
      icon: AccountBalance,
      color: '#1976d2'
    },
    {
      title: 'Average Interest Rate',
      value: '4.5%',
      icon: TrendingUp,
      color: '#2e7d32'
    },
    {
      title: 'Total Loan Amount',
      value: '$45,000',
      icon: Assessment,
      color: '#ed6c02'
    },
    {
      title: 'Monthly Payments',
      value: '$1,250',
      icon: Timeline,
      color: '#9c27b0'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent sx={{ color: card.color, mr: 1 }} />
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Dashboard; 