import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';

const steps = ['Personal', 'Financial', 'Loan', 'Additional'];

const educationLevels = [
  'High School',
  'Bachelor',
  'Master',
  'PhD',
  'Other',
];

const employmentStatuses = [
  'Full-time',
  'Part-time',
  'Self-employed',
  'Unemployed',
];

const maritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
];

const loanPurposes = [
  'Home',
  'Auto',
  'Personal',
  'Education',
  'Business',
  'Debt Consolidation',
];

function LoanApplication() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    age: '',
    education: '',
    employmentStatus: '',
    maritalStatus: '',
    
    // Financial Information
    income: '',
    monthsEmployed: '',
    creditScore: '',
    numCreditLines: '',
    dtiRatio: '',
    
    // Loan Information
    loanId: `LN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    loanPurpose: '',
    
    // Additional Information
    hasMortgage: 'No',
    hasCoSigner: 'No',
    hasDependents: 'No',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name) => (e) => {
    setFormData(prev => ({
      ...prev,
      [name]: e.target.checked ? 'Yes' : 'No'
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/applications', formData);
      navigate('/borrower');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        >
          {educationLevels.map(level => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Employment Status"
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          required
        >
          {employmentStatuses.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Marital Status"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          required
        >
          {maritalStatuses.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );

  const renderFinancialInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Annual Income"
          name="income"
          type="number"
          value={formData.income}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Credit Score"
          name="creditScore"
          type="number"
          value={formData.creditScore}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Credit Lines"
          name="numCreditLines"
          type="number"
          value={formData.numCreditLines}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Debt-to-Income Ratio"
          name="dtiRatio"
          type="number"
          value={formData.dtiRatio}
          onChange={handleChange}
          required
        />
      </Grid>
    </Grid>
  );

  const renderLoanInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Loan ID"
          name="loanId"
          value={formData.loanId}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Loan Amount"
          name="loanAmount"
          type="number"
          value={formData.loanAmount}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Interest Rate (%)"
          name="interestRate"
          type="number"
          value={formData.interestRate}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Loan Purpose"
          name="loanPurpose"
          value={formData.loanPurpose}
          onChange={handleChange}
          required
        >
          {loanPurposes.map(purpose => (
            <MenuItem key={purpose} value={purpose}>{purpose}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );

  const renderAdditionalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.hasMortgage === 'Yes'}
              onChange={handleSwitchChange('hasMortgage')}
            />
          }
          label="Has Mortgage"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.hasCoSigner === 'Yes'}
              onChange={handleSwitchChange('hasCoSigner')}
            />
          }
          label="Has Co-Signer"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.hasDependents === 'Yes'}
              onChange={handleSwitchChange('hasDependents')}
            />
          }
          label="Has Dependents"
        />
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderFinancialInfo();
      case 2:
        return renderLoanInfo();
      case 3:
        return renderAdditionalInfo();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Loan Application
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Submit a new borrower application for risk assessment
      </Typography>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Previous
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoanApplication; 