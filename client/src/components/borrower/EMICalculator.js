import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  TextField,
  Grid,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = loanTerm * 12;

    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterestPayment = totalAmount - principal;

    setEmi(emi);
    setTotalInterest(totalInterestPayment);
    setTotalPayment(totalAmount);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];

  const COLORS = ['#4CAF50', '#FF5252'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Loan EMI Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate your monthly EMI, total interest and payment
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loan Parameters
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Adjust the values to calculate your EMI
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>
                  Loan Amount: {formatCurrency(loanAmount)}
                </Typography>
                <Slider
                  value={loanAmount}
                  onChange={(_, value) => setLoanAmount(value)}
                  min={100000}
                  max={10000000}
                  step={100000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={value => formatCurrency(value)}
                />
                <TextField
                  fullWidth
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  type="number"
                  sx={{ mt: 1 }}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>
                  Interest Rate: {interestRate}%
                </Typography>
                <Slider
                  value={interestRate}
                  onChange={(_, value) => setInterestRate(value)}
                  min={4}
                  max={20}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={value => `${value}%`}
                />
                <TextField
                  fullWidth
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  type="number"
                  sx={{ mt: 1 }}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>
                  Loan Term: {loanTerm} years
                </Typography>
                <Slider
                  value={loanTerm}
                  onChange={(_, value) => setLoanTerm(value)}
                  min={1}
                  max={30}
                  valueLabelDisplay="auto"
                  valueLabelFormat={value => `${value} years`}
                />
                <TextField
                  fullWidth
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  type="number"
                  sx={{ mt: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loan Summary
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Your loan payment breakdown
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Monthly EMI
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {formatCurrency(emi)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Interest
                    </Typography>
                    <Typography variant="h6" color="error" gutterBottom>
                      {formatCurrency(totalInterest)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Payment
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {formatCurrency(totalPayment)}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ height: 300, mt: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                      <Box sx={{ width: 12, height: 12, bgcolor: COLORS[0], mr: 1 }} />
                      <Typography variant="body2">Principal: {Math.round((loanAmount / totalPayment) * 100)}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 12, height: 12, bgcolor: COLORS[1], mr: 1 }} />
                      <Typography variant="body2">Interest: {Math.round((totalInterest / totalPayment) * 100)}%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EMICalculator; 