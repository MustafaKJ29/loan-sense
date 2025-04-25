import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

function EMICalculator() {
  const [formData, setFormData] = useState({
    principal: '',
    interestRate: '',
    tenure: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = () => {
    const P = parseFloat(formData.principal);
    const R = parseFloat(formData.interestRate) / 12 / 100; // Monthly interest rate
    const N = parseFloat(formData.tenure) * 12; // Total number of months

    // EMI calculation formula: P * R * (1 + R)^N / ((1 + R)^N - 1)
    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    setResult({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        EMI Calculator
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Loan Amount"
                  name="principal"
                  type="number"
                  value={formData.principal}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                  }}
                />

                <TextField
                  fullWidth
                  label="Interest Rate (% per year)"
                  name="interestRate"
                  type="number"
                  value={formData.interestRate}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>
                  }}
                />

                <TextField
                  fullWidth
                  label="Loan Tenure (years)"
                  name="tenure"
                  type="number"
                  value={formData.tenure}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 1 }}>years</Typography>
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Calculate EMI
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {result && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', backgroundColor: 'primary.light' }}>
              <Typography variant="h5" gutterBottom color="white">
                Loan Summary
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" color="white">
                  Monthly EMI
                </Typography>
                <Typography variant="h4" color="white" gutterBottom>
                  ${result.emi}
                </Typography>

                <Typography variant="h6" color="white" sx={{ mt: 2 }}>
                  Total Payment
                </Typography>
                <Typography variant="h4" color="white" gutterBottom>
                  ${result.totalAmount}
                </Typography>

                <Typography variant="h6" color="white" sx={{ mt: 2 }}>
                  Total Interest
                </Typography>
                <Typography variant="h4" color="white">
                  ${result.totalInterest}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default EMICalculator; 