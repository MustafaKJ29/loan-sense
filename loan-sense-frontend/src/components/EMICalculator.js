import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(180); // 15 years in months
  const [emi, setEMI] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = (interestRate / 12) / 100;
    const numberOfPayments = loanTerm;

    const emiAmount = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = emiAmount * numberOfPayments;
    const totalInterestAmount = totalAmount - principal;

    setEMI(emiAmount);
    setTotalPayment(totalAmount);
    setTotalInterest(totalInterestAmount);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  const handleTermChange = (event, newValue) => {
    setLoanTerm(newValue);
  };

  const pieChartData = [
    { id: 0, value: loanAmount, label: 'Principal', color: '#1976d2' },
    { id: 1, value: totalInterest, label: 'Total Interest', color: '#dc004e' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        EMI Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Estimate your monthly loan payments and total interest
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* Sliders */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Loan Amount</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  min={50000}
                  max={1000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => formatCurrency(value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formatCurrency(loanAmount)}
                  size="small"
                  sx={{ width: 150 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Interest Rate (%)</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  min={2}
                  max={15}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={`${interestRate}%`}
                  size="small"
                  sx={{ width: 150 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Loan Term</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={loanTerm}
                  onChange={handleTermChange}
                  min={60}
                  max={360}
                  step={60}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value / 12} years`}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={`${loanTerm / 12} years`}
                  size="small"
                  sx={{ width: 150 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Results */}
          <Box sx={{ height: 300, mb: 4 }}>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                },
              ]}
              height={300}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Monthly EMI</TableCell>
                  <TableCell>Total Principal</TableCell>
                  <TableCell>Total Interest</TableCell>
                  <TableCell>Total Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(emi)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {formatCurrency(loanAmount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="error">
                      {formatCurrency(totalInterest)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {formatCurrency(totalPayment)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EMICalculator; 