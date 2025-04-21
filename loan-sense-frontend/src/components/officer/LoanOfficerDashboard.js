import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import axios from 'axios';

const LoanOfficerDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/loans`);
      if (response.data.success) {
        setLoans(response.data.data);
      } else {
        setError('Failed to fetch loan applications');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch loan applications');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (loanId, newStatus) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/loan/${loanId}/status`, { status: newStatus });
      if (response.data.success) {
        setSuccess(true);
        fetchLoans();
      } else {
        setError('Failed to update loan status');
      }
    } catch (err) {
      setError('Failed to update loan status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Loan Applications Dashboard
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Loan status updated successfully!
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loan ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Risk Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>{loan.loanId}</TableCell>
                <TableCell>{loan.name}</TableCell>
                <TableCell>${loan.loanAmount.toLocaleString()}</TableCell>
                <TableCell>{loan.riskRating}</TableCell>
                <TableCell>
                  <Chip
                    label={loan.status}
                    color={getStatusColor(loan.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {loan.status === 'Pending' && (
                    <Box>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleStatusUpdate(loan.loanId, 'Approved')}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleStatusUpdate(loan.loanId, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoanOfficerDashboard; 