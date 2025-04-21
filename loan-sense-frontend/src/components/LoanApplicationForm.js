import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Alert,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';

const educationLevels = ['HighSchool', 'Bachelors', 'Masters', 'Doctorate'];
const employmentStatuses = ['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED'];
const maritalStatuses = ['SINGLE', 'MARRIED', 'DIVORCED'];
const binaryOptions = ['YES', 'NO'];
const loanPurposes = ['HOME_PURCHASE', 'REFINANCE', 'DEBT_CONSOLIDATION', 'HOME_IMPROVEMENT'];

const formatCurrency = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Income: '',
    LoanAmount: '',
    CreditScore: '',
    MonthsEmployed: '',
    NumCreditLines: '',
    InterestRate: '',
    LoanTerm: '',
    DTIratio: '',
    Education: '',
    EmploymentStatus: '',
    MaritalStatus: '',
    HasMortgage: '',
    HasDependents: '',
    LoanPurpose: '',
    HasCoSigner: '',
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'Age':
        return value < 21 || value > 70 ? 'Age must be between 21 and 70' : '';
      case 'Income':
        return value < 20000 ? 'Income must be at least $20,000' : '';
      case 'LoanAmount':
        return value < 50000 ? 'Loan amount must be at least $50,000' : '';
      case 'CreditScore':
        return value < 300 || value > 850 ? 'Credit score must be between 300 and 850' : '';
      case 'DTIratio':
        return value < 0 || value > 1 ? 'DTI ratio must be between 0 and 1' : '';
      case 'InterestRate':
        return value < 2 || value > 15 ? 'Interest rate must be between 2% and 15%' : '';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Convert string values to numbers where appropriate
    const processedData = {
      ...formData,
      Age: Number(formData.Age),
      Income: Number(formData.Income),
      LoanAmount: Number(formData.LoanAmount),
      CreditScore: Number(formData.CreditScore),
      MonthsEmployed: Number(formData.MonthsEmployed),
      NumCreditLines: Number(formData.NumCreditLines),
      InterestRate: Number(formData.InterestRate),
      LoanTerm: Number(formData.LoanTerm),
      DTIratio: Number(formData.DTIratio),
    };

    try {
      const response = await axios.post(`${API_URL}/predict`, processedData);
      setResult(response.data);
      // Scroll to results
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {
      console.error('API Error:', err);
      setError(
        err.response?.data?.message || 
        'An error occurred while processing your request. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getHelperText = (fieldName) => {
    switch (fieldName) {
      case 'Age':
        return 'Must be between 21 and 70 years';
      case 'Income':
        return 'Annual income before taxes';
      case 'LoanAmount':
        return 'Minimum loan amount is $50,000';
      case 'CreditScore':
        return 'Must be between 300 and 850';
      case 'DTIratio':
        return 'Debt-to-income ratio (0.0 to 1.0)';
      case 'InterestRate':
        return 'Must be between 2% and 15%';
      default:
        return '';
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Age"
              name="Age"
              type="number"
              value={formData.Age}
              onChange={handleChange}
              error={!!errors.Age}
              helperText={errors.Age || getHelperText('Age')}
              inputProps={{ min: 21, max: 70 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Annual Income"
              name="Income"
              type="number"
              value={formData.Income}
              onChange={handleChange}
              error={!!errors.Income}
              helperText={errors.Income || getHelperText('Income')}
              inputProps={{ min: 20000 }}
              InputProps={{
                startAdornment: '$',
              }}
            />
          </Grid>

          {/* Loan Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Loan Details
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Loan Amount"
              name="LoanAmount"
              type="number"
              value={formData.LoanAmount}
              onChange={handleChange}
              error={!!errors.LoanAmount}
              helperText={errors.LoanAmount || getHelperText('LoanAmount')}
              inputProps={{ min: 50000 }}
              InputProps={{
                startAdornment: '$',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Interest Rate (%)"
              name="InterestRate"
              type="number"
              value={formData.InterestRate}
              onChange={handleChange}
              error={!!errors.InterestRate}
              helperText={errors.InterestRate || getHelperText('InterestRate')}
              inputProps={{ min: 2, max: 15, step: 0.1 }}
              InputProps={{
                endAdornment: '%',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Loan Term"
              name="LoanTerm"
              select
              value={formData.LoanTerm}
              onChange={handleChange}
            >
              <MenuItem value={180}>15 years (180 months)</MenuItem>
              <MenuItem value={360}>30 years (360 months)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Loan Purpose"
              name="LoanPurpose"
              select
              value={formData.LoanPurpose}
              onChange={handleChange}
            >
              {loanPurposes.map((purpose) => (
                <MenuItem key={purpose} value={purpose}>
                  {purpose.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Financial Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Financial Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Credit Score"
              name="CreditScore"
              type="number"
              value={formData.CreditScore}
              onChange={handleChange}
              error={!!errors.CreditScore}
              helperText={errors.CreditScore || getHelperText('CreditScore')}
              inputProps={{ min: 300, max: 850 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Debt-to-Income Ratio"
              name="DTIratio"
              type="number"
              value={formData.DTIratio}
              onChange={handleChange}
              error={!!errors.DTIratio}
              helperText={errors.DTIratio || getHelperText('DTIratio')}
              inputProps={{ min: 0, max: 1, step: 0.01 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Number of Credit Lines"
              name="NumCreditLines"
              type="number"
              value={formData.NumCreditLines}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Months Employed"
              name="MonthsEmployed"
              type="number"
              value={formData.MonthsEmployed}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Education Level"
              name="Education"
              select
              value={formData.Education}
              onChange={handleChange}
            >
              {educationLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Employment Status"
              name="EmploymentStatus"
              select
              value={formData.EmploymentStatus}
              onChange={handleChange}
            >
              {employmentStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.replace('_', ' ')}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Marital Status"
              name="MaritalStatus"
              select
              value={formData.MaritalStatus}
              onChange={handleChange}
            >
              {maritalStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Has Mortgage"
              name="HasMortgage"
              select
              value={formData.HasMortgage}
              onChange={handleChange}
            >
              {binaryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Has Dependents"
              name="HasDependents"
              select
              value={formData.HasDependents}
              onChange={handleChange}
            >
              {binaryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Has Co-Signer"
              name="HasCoSigner"
              select
              value={formData.HasCoSigner}
              onChange={handleChange}
            >
              {binaryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading || Object.keys(errors).length > 0}
              sx={{ mt: 2 }}
            >
              {loading ? 'Processing...' : 'Assess Loan Risk'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Error Message */}
      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Results Section */}
      {result && (
        <Box mt={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Risk Assessment Results
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Risk Score
                </Typography>
                <Typography variant="h5">
                  {result.risk_score.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Risk Level
                </Typography>
                <Typography 
                  variant="h5"
                  color={
                    result.risk_level === 'High' 
                      ? 'error.main' 
                      : result.risk_level === 'Medium' 
                        ? 'warning.main' 
                        : 'success.main'
                  }
                >
                  {result.risk_level}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Default Probability
                </Typography>
                <Typography variant="h5">
                  {(result.default_probability * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Recommendation
                </Typography>
                <Typography 
                  variant="h5"
                  color={
                    result.approval_recommendation === 'Reject' 
                      ? 'error.main' 
                      : result.approval_recommendation === 'Review' 
                        ? 'warning.main' 
                        : 'success.main'
                  }
                >
                  {result.approval_recommendation}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};

export default LoanApplicationForm; 