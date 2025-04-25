import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
} from '@mui/material';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    setApplications(storedApplications);
  }, []);

  const handleStatusChange = (application) => {
    setSelectedApp(application);
    setNewStatus(application.status);
    setOpenDialog(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedApp || !newStatus) return;

    const updatedApplications = applications.map(app => 
      app.loanId === selectedApp.loanId ? { ...app, status: newStatus } : app
    );
    
    // Update localStorage
    localStorage.setItem('loanApplications', JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
    setOpenDialog(false);
    setStatusMessage({
      message: `Status updated successfully for Loan ID: ${selectedApp.loanId}`,
      type: 'success'
    });
  };

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

  const getRiskColor = (rating) => {
    if (rating >= 80) return 'success';
    if (rating >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Applications Dashboard
        </Typography>

        {statusMessage.message && (
          <Alert severity={statusMessage.type} sx={{ mb: 2 }}>
            {statusMessage.message}
          </Alert>
        )}

        {applications.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No loan applications to review.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Loan ID</TableCell>
                  <TableCell>Applicant Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Credit Score</TableCell>
                  <TableCell>Risk Rating</TableCell>
                  <TableCell>Application Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.loanId}>
                    <TableCell>{application.loanId}</TableCell>
                    <TableCell>{application.applicantName}</TableCell>
                    <TableCell>${application.loanAmount}</TableCell>
                    <TableCell>{application.loanPurpose}</TableCell>
                    <TableCell>{application.creditScore}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${application.riskRating}%`}
                        color={getRiskColor(application.riskRating)}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(application.applicationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleStatusChange(application)}
                      >
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update Application Status</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatus} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Dashboard; 