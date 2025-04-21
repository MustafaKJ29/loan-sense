import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const BorrowerDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    loanAmount: '',
    creditScore: '',
    monthsEmployed: '',
    numCreditLines: '',
    interestRate: '',
    loanTerm: '',
    dtiRatio: '',
    education: '',
    employmentType: '',
    maritalStatus: '',
    hasMortgage: '',
    hasDependents: '',
    loanPurpose: '',
    hasCoSigner: ''
  });

  const [emiData, setEmiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5001/api/loan/assess', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          age: '',
          income: '',
          loanAmount: '',
          creditScore: '',
          monthsEmployed: '',
          numCreditLines: '',
          interestRate: '',
          loanTerm: '',
          dtiRatio: '',
          education: '',
          employmentType: '',
          maritalStatus: '',
          hasMortgage: '',
          hasDependents: '',
          loanPurpose: '',
          hasCoSigner: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting the application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        Loan Application Portal
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Loan Application Form
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="age"
                      label="Age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="income"
                      label="Annual Income ($)"
                      type="number"
                      value={formData.income}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="loanAmount"
                      label="Loan Amount ($)"
                      type="number"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="creditScore"
                      label="Credit Score"
                      type="number"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="monthsEmployed"
                      label="Months Employed"
                      type="number"
                      value={formData.monthsEmployed}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="numCreditLines"
                      label="Number of Credit Lines"
                      type="number"
                      value={formData.numCreditLines}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="interestRate"
                      label="Interest Rate (%)"
                      type="number"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="loanTerm"
                      label="Loan Term (Years)"
                      type="number"
                      value={formData.loanTerm}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="dtiRatio"
                      label="DTI Ratio"
                      type="number"
                      value={formData.dtiRatio}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="education"
                      label="Education Level"
                      select
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select Education</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="employmentType"
                      label="Employment Type"
                      select
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Unemployed">Unemployed</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="maritalStatus"
                      label="Marital Status"
                      select
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="hasMortgage"
                      label="Has Mortgage"
                      select
                      value={formData.hasMortgage}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="hasDependents"
                      label="Has Dependents"
                      select
                      value={formData.hasDependents}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="loanPurpose"
                      label="Loan Purpose"
                      select
                      value={formData.loanPurpose}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select Purpose</option>
                      <option value="Home">Home</option>
                      <option value="Car">Car</option>
                      <option value="Education">Education</option>
                      <option value="Business">Business</option>
                      <option value="Personal">Personal</option>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="hasCoSigner"
                      label="Has Co-signer"
                      select
                      value={formData.hasCoSigner}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </TextField>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{
                      minWidth: 200,
                      py: 1.5
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                  </Button>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Application submitted successfully!
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                EMI Calculator
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={calculateEMI}
                  disabled={!formData.loanAmount || !formData.interestRate || !formData.loanTerm}
                  sx={{ minWidth: 180, py: 1.5 }}
                >
                  Calculate EMI
                </Button>
              </Box>

              {emiData && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Loan Summary
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Monthly EMI: <strong>${emiData.emi}</strong>
                    </Typography>
                    <Typography variant="body1">
                      Total Payment: <strong>${emiData.totalPayment}</strong>
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
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BorrowerDashboard; 