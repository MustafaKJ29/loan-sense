import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import axios from 'axios';

function LoanApplication() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    loanAmount: '',
    creditScore: '',
    monthsEmployed: '',
    dtiRatio: '',
    education: '',
    employmentType: '',
    maritalStatus: '',
    hasMortgage: '',
    hasDependents: '',
    loanPurpose: '',
    hasCoSigner: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/loan/assess`, formData);
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          age: '',
          income: '',
          loanAmount: '',
          creditScore: '',
          monthsEmployed: '',
          dtiRatio: '',
          education: '',
          employmentType: '',
          maritalStatus: '',
          hasMortgage: '',
          hasDependents: '',
          loanPurpose: '',
          hasCoSigner: ''
        });
      } else {
        setError(response.data.message || 'Failed to submit loan application');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.response?.data?.message || 'An error occurred while submitting the application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Loan Application
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Fill out the form below to apply for a loan.
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="age"
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="income"
                  label="Annual Income ($)"
                  type="number"
                  value={formData.income}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="creditScore"
                  label="Credit Score"
                  type="number"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="education"
                  label="Education Level"
                  select
                  value={formData.education}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                  <MenuItem value="Master's">Master's</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="maritalStatus"
                  label="Marital Status"
                  select
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Employment Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="employmentType"
                  label="Employment Type"
                  select
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="self-employed">Self-employed</MenuItem>
                  <MenuItem value="unemployed">Unemployed</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="monthsEmployed"
                  label="Months at Current Job"
                  type="number"
                  value={formData.monthsEmployed}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Loan Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <TextField
                  name="dtiRatio"
                  label="Debt-to-Income Ratio (%)"
                  type="number"
                  value={formData.dtiRatio}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="loanPurpose"
                  label="Loan Purpose"
                  select
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Additional Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="hasMortgage"
                  label="Do you have a mortgage?"
                  select
                  value={formData.hasMortgage}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="hasDependents"
                  label="Do you have dependents?"
                  select
                  value={formData.hasDependents}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="hasCoSigner"
                  label="Do you have a co-signer?"
                  select
                  value={formData.hasCoSigner}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Your loan application has been submitted successfully!
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoanApplication; 