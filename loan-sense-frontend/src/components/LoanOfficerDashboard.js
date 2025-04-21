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
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import axios from 'axios';

const LoanOfficerDashboard = () => {
  const theme = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/loan/applications');
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch applications');
      setLoading(false);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/loan/status/${loanId}`, { status: newStatus });
      fetchApplications();
    } catch (err) {
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

  const getRiskColor = (riskRating) => {
    if (riskRating > 70) return theme.palette.error.main;
    if (riskRating > 40) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        Loan Officer Dashboard
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" color="primary">
              Loan Applications
            </Typography>
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Total Applications: {applications.length}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Loan ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Loan Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Risk Rating</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow 
                    key={application._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <TableCell>{application.loanId}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell align="right">
                      ${application.loanAmount.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${application.riskRating}%`}
                        sx={{
                          backgroundColor: getRiskColor(application.riskRating),
                          color: '#fff',
                          fontWeight: 'bold',
                          minWidth: 80
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        sx={{ minWidth: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {application.status === 'Pending' && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleStatusChange(application._id, 'Approved')}
                            sx={{ minWidth: 90 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleStatusChange(application._id, 'Rejected')}
                            sx={{ minWidth: 90 }}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => handleStatusChange(application._id, 'Flagged for Review')}
                            sx={{ minWidth: 90 }}
                          >
                            Flag
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoanOfficerDashboard; 