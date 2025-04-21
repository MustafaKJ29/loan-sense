import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

function EMICalculator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: ''
  });

  const [emiData, setEmiData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = () => {
    const { loanAmount, interestRate, loanTerm } = formData;
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTerm) * 12;

    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;

    setEmiData({
      principal,
      interest: totalInterest,
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        EMI Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate your monthly EMI and view the loan breakdown.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loan Details
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="loanAmount"
                    label="Loan Amount ($)"
                    type="number"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="interestRate"
                    label="Interest Rate (%)"
                    type="number"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="loanTerm"
                    label="Loan Term (Years)"
                    type="number"
                    value={formData.loanTerm}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={calculateEMI}
                  disabled={!formData.loanAmount || !formData.interestRate || !formData.loanTerm}
                  sx={{ minWidth: 200, py: 1.5 }}
                >
                  Calculate EMI
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {emiData && (
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  EMI Breakdown
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Monthly EMI: <strong>${emiData.emi}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Total Payment: <strong>${emiData.totalPayment}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Total Interest: <strong>${emiData.interest.toFixed(2)}</strong>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: emiData.principal, label: 'Principal', color: theme.palette.primary.main },
                          { id: 1, value: emiData.interest, label: 'Interest', color: theme.palette.secondary.main },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 270,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    width={isMobile ? 300 : 400}
                    height={300}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default EMICalculator; 