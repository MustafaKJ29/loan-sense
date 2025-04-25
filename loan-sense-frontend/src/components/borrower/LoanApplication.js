import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';

function LoanApplication() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    loanAmount: '',
    creditScore: '',
    monthsEmployed: '',
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

  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (Object.values(formData).some(value => value === '')) {
      setStatus({
        message: 'Please fill in all fields',
        type: 'error'
      });
      return;
    }

    // Validate age
    if (parseInt(formData.age) < 18) {
      setStatus({
        message: 'Applicant must be at least 18 years old',
        type: 'error'
      });
      return;
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Generate unique loan ID
    const loanId = `LOAN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate risk rating (hidden from borrower but stored for loan officer)
    const riskRating = calculateRiskRating(formData);

    // Create loan application object
    const loanApplication = {
      ...formData,
      loanId,
      applicantId: user.email,
      applicantName: formData.name,
      applicationDate: new Date().toISOString(),
      status: 'pending',
      riskRating // This will only be visible to loan officers
    };

    // Get existing applications or initialize empty array
    const applications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    
    // Add new application
    applications.push(loanApplication);
    
    // Save to localStorage
    localStorage.setItem('loanApplications', JSON.stringify(applications));

    // Show success message (without revealing risk rating)
    setStatus({
      message: `Your loan application has been submitted successfully! Your reference ID is: ${loanId}. We will review your application and get back to you soon.`,
      type: 'success'
    });

    // Reset form
    setFormData({
      name: '',
      age: '',
      income: '',
      loanAmount: '',
      creditScore: '',
      monthsEmployed: '',
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
  };

  const calculateRiskRating = (data) => {
    // Convert categorical variables to numeric
    const educationMap = {
      'High School': 0,
      "Bachelor's": 1,
      "Master's": 2,
      'PhD': 3
    };

    const employmentTypeMap = {
      'Unemployed': 0,
      'Part-time': 1,
      'Self-employed': 2,
      'Full-time': 3
    };

    const maritalStatusMap = {
      'Single': 0,
      'Divorced': 1,
      'Married': 2
    };

    const binaryMap = {
      'No': 0,
      'Yes': 1
    };

    const loanPurposeMap = {
      'Other': 0,
      'Auto': 1,
      'Education': 2,
      'Business': 3,
      'Home': 4
    };

    // Prepare features in the same order as the model expects
    const features = [
      parseInt(data.age),
      parseInt(data.income),
      parseInt(data.loanAmount),
      parseInt(data.creditScore),
      parseInt(data.monthsEmployed),
      parseInt(data.loanTerm),
      parseFloat(data.dtiRatio),
      educationMap[data.education],
      employmentTypeMap[data.employmentType],
      maritalStatusMap[data.maritalStatus],
      binaryMap[data.hasMortgage],
      binaryMap[data.hasDependents],
      loanPurposeMap[data.loanPurpose],
      binaryMap[data.hasCoSigner]
    ];

    // XGBoost model logic (simplified version)
    let score = 0;
    
    // Credit Score Impact (30%)
    const creditScore = parseInt(data.creditScore);
    if (creditScore >= 750) score += 30;
    else if (creditScore >= 700) score += 25;
    else if (creditScore >= 650) score += 20;
    else if (creditScore >= 600) score += 15;
    else score += 10;

    // DTI Ratio Impact (20%)
    const dtiRatio = parseFloat(data.dtiRatio);
    if (dtiRatio <= 20) score += 20;
    else if (dtiRatio <= 30) score += 15;
    else if (dtiRatio <= 40) score += 10;
    else score += 5;

    // Employment Stability (15%)
    const monthsEmployed = parseInt(data.monthsEmployed);
    if (monthsEmployed >= 60) score += 15;
    else if (monthsEmployed >= 36) score += 12;
    else if (monthsEmployed >= 24) score += 8;
    else score += 5;

    // Income to Loan Ratio (15%)
    const incomeToLoanRatio = parseInt(data.income) / parseInt(data.loanAmount);
    if (incomeToLoanRatio >= 0.5) score += 15;
    else if (incomeToLoanRatio >= 0.3) score += 10;
    else if (incomeToLoanRatio >= 0.2) score += 5;
    else score += 2;

    // Other Factors (20%)
    if (data.employmentType === 'Full-time') score += 5;
    if (data.education === "Master's" || data.education === 'PhD') score += 5;
    if (data.hasCoSigner === 'Yes') score += 5;
    if (data.hasMortgage === 'No') score += 5;

    return Math.min(100, Math.max(0, score));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Application
      </Typography>
      
      {status.message && (
        <Alert severity={status.type} sx={{ mb: 3 }}>
          {status.message}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 18 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Annual Income"
                  name="income"
                  type="number"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Loan Amount"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Credit Score"
                  name="creditScore"
                  type="number"
                  value={formData.creditScore}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 300, max: 850 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Months Employed"
                  name="monthsEmployed"
                  type="number"
                  value={formData.monthsEmployed}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Loan Term (months)"
                  name="loanTerm"
                  type="number"
                  value={formData.loanTerm}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="DTI Ratio"
                  name="dtiRatio"
                  type="number"
                  value={formData.dtiRatio}
                  onChange={handleChange}
                  required
                  inputProps={{ step: "0.01" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Education</InputLabel>
                  <Select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    label="Education"
                  >
                    <MenuItem value="High School">High School</MenuItem>
                    <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                    <MenuItem value="Master's">Master's</MenuItem>
                    <MenuItem value="PhD">PhD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    label="Employment Type"
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Self-employed">Self-employed</MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    label="Marital Status"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Has Mortgage</InputLabel>
                  <Select
                    name="hasMortgage"
                    value={formData.hasMortgage}
                    onChange={handleChange}
                    label="Has Mortgage"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Has Dependents</InputLabel>
                  <Select
                    name="hasDependents"
                    value={formData.hasDependents}
                    onChange={handleChange}
                    label="Has Dependents"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Loan Purpose</InputLabel>
                  <Select
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    label="Loan Purpose"
                  >
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Auto">Auto</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Has Co-Signer</InputLabel>
                  <Select
                    name="hasCoSigner"
                    value={formData.hasCoSigner}
                    onChange={handleChange}
                    label="Has Co-Signer"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit Application
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