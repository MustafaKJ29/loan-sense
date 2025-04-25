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
    let riskScore = 0;
    
    // Credit Score Impact (30% of risk)
    // Higher credit score = Lower risk
    const creditScore = parseInt(data.creditScore);
    if (creditScore >= 750) riskScore += 0;  // Excellent - No risk
    else if (creditScore >= 700) riskScore += 7;  // Very Good
    else if (creditScore >= 650) riskScore += 15; // Good
    else if (creditScore >= 600) riskScore += 22; // Fair
    else riskScore += 30; // Poor

    // DTI Ratio Impact (20% of risk)
    // Higher DTI = Higher risk
    const dtiRatio = parseFloat(data.dtiRatio);
    if (dtiRatio <= 20) riskScore += 0;     // Excellent
    else if (dtiRatio <= 30) riskScore += 5; // Good
    else if (dtiRatio <= 40) riskScore += 12; // Fair
    else riskScore += 20; // Poor

    // Employment Stability (15% of risk)
    // More months employed = Lower risk
    const monthsEmployed = parseInt(data.monthsEmployed);
    if (monthsEmployed >= 60) riskScore += 0;     // 5+ years - Very Stable
    else if (monthsEmployed >= 36) riskScore += 5; // 3+ years - Stable
    else if (monthsEmployed >= 24) riskScore += 10; // 2+ years - Moderate
    else riskScore += 15; // Less than 2 years - Risky

    // Income to Loan Amount Ratio (20% of risk)
    // Higher ratio = Lower risk (income is X times the loan amount)
    const incomeToLoanRatio = parseInt(data.income) / parseInt(data.loanAmount);
    if (incomeToLoanRatio >= 3) riskScore += 0;     // Excellent - Income is 3x or more
    else if (incomeToLoanRatio >= 2) riskScore += 5; // Good - Income is 2x
    else if (incomeToLoanRatio >= 1) riskScore += 12; // Fair - Income equals loan
    else riskScore += 20; // Poor - Income less than loan amount

    // Other Factors (15% of risk)
    let otherFactorsRisk = 15; // Start with maximum risk

    // Employment Type (5%)
    if (data.employmentType === 'Full-time') otherFactorsRisk -= 5;
    else if (data.employmentType === 'Part-time') otherFactorsRisk -= 3;
    else if (data.employmentType === 'Self-employed') otherFactorsRisk -= 2;
    // Unemployed gets no reduction

    // Education (4%)
    if (data.education === 'PhD') otherFactorsRisk -= 4;
    else if (data.education === "Master's") otherFactorsRisk -= 3;
    else if (data.education === "Bachelor's") otherFactorsRisk -= 2;
    else if (data.education === "High School") otherFactorsRisk -= 1;

    // Co-Signer (3%)
    if (data.hasCoSigner === 'Yes') otherFactorsRisk -= 3;

    // Mortgage History (3%)
    if (data.hasMortgage === 'Yes') otherFactorsRisk -= 3; // Has history of managing debt

    riskScore += otherFactorsRisk;

    return Math.min(100, Math.max(0, riskScore));
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
                    startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
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
                    startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
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