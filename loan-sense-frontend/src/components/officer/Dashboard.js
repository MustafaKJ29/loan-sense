import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import axios from 'axios';
import Navbar from '../shared/Navbar';

function Dashboard() {
  const userRole = localStorage.getItem('userRole');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://loan-sense-backend.onrender.com/api/loans');
      setApplications(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
      setLoading(false);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(`https://loan-sense-backend.onrender.com/api/loan/${loanId}/status`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update application status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Flagged for Review':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleViewProfile = (application) => {
    setSelectedApplication(application);
    setProfileDialogOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileDialogOpen(false);
    setSelectedApplication(null);
  };

  if (!userRole || userRole !== 'officer') {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar userRole="officer" />
      
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Loan Applications Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Review and manage loan applications
        </Typography>

        <Card elevation={3}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="primary">
                Applications Overview
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Total Applications: {applications.length}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Loan ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Loan Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Risk Rating</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Profile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow 
                      key={application.loanId}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <TableCell>{application.loanId}</TableCell>
                      <TableCell 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => handleViewProfile(application)}
                      >
                        {application.name}
                      </TableCell>
                      <TableCell align="right">
                        ${application.loanAmount.toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${application.riskRating}%`}
                          color={
                            application.riskRating > 70 ? 'error' :
                            application.riskRating > 40 ? 'warning' : 'success'
                          }
                          sx={{ minWidth: 80 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.loanId, e.target.value)}
                          size="small"
                          sx={{
                            minWidth: 150,
                            '& .MuiSelect-select': {
                              padding: '4px 8px',
                            },
                          }}
                        >
                          <MenuItem value="Pending">
                            <Chip label="Pending" color="default" size="small" />
                          </MenuItem>
                          <MenuItem value="Approved">
                            <Chip label="Approved" color="success" size="small" />
                          </MenuItem>
                          <MenuItem value="Rejected">
                            <Chip label="Rejected" color="error" size="small" />
                          </MenuItem>
                          <MenuItem value="Flagged for Review">
                            <Chip label="Flagged" color="warning" size="small" />
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewProfile(application)}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Profile Dialog */}
      <Dialog 
        open={profileDialogOpen} 
        onClose={handleCloseProfile}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Typography variant="h6">
                Applicant Profile: {selectedApplication.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Loan ID: {selectedApplication.loanId}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Personal Information</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                  <Typography variant="body1">{selectedApplication.age}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Education</Typography>
                  <Typography variant="body1">{selectedApplication.education}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Marital Status</Typography>
                  <Typography variant="body1">{selectedApplication.maritalStatus}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Employment Details</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Employment Type</Typography>
                  <Typography variant="body1">{selectedApplication.employmentType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Months Employed</Typography>
                  <Typography variant="body1">{selectedApplication.monthsEmployed}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Annual Income</Typography>
                  <Typography variant="body1">${selectedApplication.income.toLocaleString()}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Loan Details</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Loan Amount</Typography>
                  <Typography variant="body1">${selectedApplication.loanAmount.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Loan Purpose</Typography>
                  <Typography variant="body1">{selectedApplication.loanPurpose}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Credit Score</Typography>
                  <Typography variant="body1">{selectedApplication.creditScore}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">DTI Ratio</Typography>
                  <Typography variant="body1">{selectedApplication.dtiRatio}%</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Additional Information</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">Has Mortgage</Typography>
                  <Typography variant="body1">{selectedApplication.hasMortgage ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">Has Dependents</Typography>
                  <Typography variant="body1">{selectedApplication.hasDependents ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">Has Co-Signer</Typography>
                  <Typography variant="body1">{selectedApplication.hasCoSigner ? 'Yes' : 'No'}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProfile}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Dashboard; 