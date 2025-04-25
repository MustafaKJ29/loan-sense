import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';

function LoanOfficerDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Load applications from localStorage
    const loadedApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    setApplications(loadedApplications);
  }, []);

  const getRiskColor = (riskRating) => {
    if (riskRating <= 25) return 'success';
    if (riskRating <= 50) return 'warning';
    return 'error';
  };

  const getRiskLabel = (riskRating) => {
    if (riskRating <= 25) return 'Low Risk';
    if (riskRating <= 50) return 'Medium Risk';
    return 'High Risk';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateStatus = (loanId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.loanId === loanId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('loanApplications', JSON.stringify(updatedApplications));
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Applications Dashboard
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application ID</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Risk Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((loan) => (
              <TableRow key={loan.loanId}>
                <TableCell>{loan.loanId}</TableCell>
                <TableCell>{loan.applicantName}</TableCell>
                <TableCell>{formatCurrency(loan.loanAmount)}</TableCell>
                <TableCell>
                  <Chip
                    label={`${loan.riskRating}% - ${getRiskLabel(loan.riskRating)}`}
                    color={getRiskColor(loan.riskRating)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={loan.status.toUpperCase()}
                    color={loan.status === 'approved' ? 'success' : loan.status === 'rejected' ? 'error' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleViewDetails(loan)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedLoan && (
          <>
            <DialogTitle>Loan Application Details</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Name:</strong> {selectedLoan.name}</Typography>
                    <Typography><strong>Age:</strong> {selectedLoan.age}</Typography>
                    <Typography><strong>Education:</strong> {selectedLoan.education}</Typography>
                    <Typography><strong>Marital Status:</strong> {selectedLoan.maritalStatus}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Employment Type:</strong> {selectedLoan.employmentType}</Typography>
                    <Typography><strong>Months Employed:</strong> {selectedLoan.monthsEmployed}</Typography>
                    <Typography><strong>Has Dependents:</strong> {selectedLoan.hasDependents}</Typography>
                    <Typography><strong>Has Mortgage:</strong> {selectedLoan.hasMortgage}</Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Loan Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Loan Amount:</strong> {formatCurrency(selectedLoan.loanAmount)}</Typography>
                    <Typography><strong>Annual Income:</strong> {formatCurrency(selectedLoan.income)}</Typography>
                    <Typography><strong>DTI Ratio:</strong> {selectedLoan.dtiRatio}%</Typography>
                    <Typography><strong>Credit Score:</strong> {selectedLoan.creditScore}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Loan Purpose:</strong> {selectedLoan.loanPurpose}</Typography>
                    <Typography><strong>Loan Term:</strong> {selectedLoan.loanTerm} months</Typography>
                    <Typography><strong>Has Co-Signer:</strong> {selectedLoan.hasCoSigner}</Typography>
                    <Typography><strong>Risk Rating:</strong> 
                      <Chip
                        size="small"
                        sx={{ ml: 1 }}
                        label={`${selectedLoan.riskRating}% - ${getRiskLabel(selectedLoan.riskRating)}`}
                        color={getRiskColor(selectedLoan.riskRating)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              {selectedLoan.status === 'pending' && (
                <>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedLoan.loanId, 'approved')}
                    color="success"
                    variant="contained"
                  >
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedLoan.loanId, 'rejected')}
                    color="error"
                    variant="contained"
                  >
                    Reject
                  </Button>
                </>
              )}
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default LoanOfficerDashboard; 