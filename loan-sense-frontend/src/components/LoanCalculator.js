import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Divider
} from '@mui/material';

function LoanCalculator() {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: ''
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLoan = () => {
    const P = parseFloat(formData.loanAmount);
    const r = parseFloat(formData.interestRate) / 100 / 12;
    const n = parseFloat(formData.loanTerm) * 12;

    if (P && r && n) {
      const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - P;

      setResult({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enter Loan Details
              </Typography>
              <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                <TextField
                  fullWidth
                  label="Loan Amount"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                  }}
                />
                <TextField
                  fullWidth
                  label="Interest Rate"
                  name="interestRate"
                  type="number"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>
                  }}
                />
                <TextField
                  fullWidth
                  label="Loan Term (Years)"
                  name="loanTerm"
                  type="number"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={calculateLoan}
                  sx={{ mt: 2 }}
                >
                  Calculate
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          {result && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calculation Results
                </Typography>
                <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                  <Box>
                    <Typography color="textSecondary">Monthly Payment</Typography>
                    <Typography variant="h5">${result.monthlyPayment}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography color="textSecondary">Total Payment</Typography>
                    <Typography variant="h5">${result.totalPayment}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography color="textSecondary">Total Interest</Typography>
                    <Typography variant="h5">${result.totalInterest}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoanCalculator; 