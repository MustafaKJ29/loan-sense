import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

function LoanStatus() {
  const [applications, setApplications] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    const loadApplications = () => {
      const storedApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
      const userApplications = storedApplications.filter(app => app.applicantId === currentUser.email);
      setApplications(userApplications);
    };

    // Initial load
    loadApplications();

    // Set up interval to check for updates
    const intervalId = setInterval(loadApplications, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentUser.email]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Applications Status
      </Typography>

      {applications.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You haven't submitted any loan applications yet.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loan ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Risk Rating</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.loanId}>
                  <TableCell>{application.loanId}</TableCell>
                  <TableCell>${application.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {application.loanPurpose.charAt(0).toUpperCase() + 
                     application.loanPurpose.slice(1)} Loan
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${application.riskRating}%`}
                      color={
                        application.riskRating >= 80 ? 'success' :
                        application.riskRating >= 60 ? 'warning' : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(application.applicationDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={application.status.charAt(0).toUpperCase() + 
                            application.status.slice(1)}
                      color={getStatusColor(application.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default LoanStatus; 