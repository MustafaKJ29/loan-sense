import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import axios from 'axios';
import Navbar from '../shared/Navbar';

function getRiskColor(riskScore) {
  if (riskScore <= 30) return '#4CAF50';
  if (riskScore <= 60) return '#FFC107';
  return '#f44336';
}

function Dashboard() {
  const userRole = localStorage.getItem('userRole');
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalAmount: 0,
    averageRisk: 0,
    highRiskCount: 0,
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applications');
      setApplications(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const amount = response.data.reduce((sum, app) => sum + app.loanAmount, 0);
      const avgRisk = response.data.reduce((sum, app) => sum + app.riskRating, 0) / total;
      const highRisk = response.data.filter(app => app.riskRating > 60).length;

      setStats({
        totalApplications: total,
        totalAmount: amount,
        averageRisk: avgRisk,
        highRiskCount: highRisk,
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${id}`, { status });
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  if (!userRole || userRole !== 'officer') {
    return <Navigate to="/login" replace />;
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.loanId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || 
      (filterRisk === 'high' && app.riskRating > 60) ||
      (filterRisk === 'medium' && app.riskRating > 30 && app.riskRating <= 60) ||
      (filterRisk === 'low' && app.riskRating <= 30);
    return matchesSearch && matchesRisk;
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar userRole="officer" />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Officer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Monitor and analyze loan applications
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Applications</Typography>
                </Box>
                <Typography variant="h4">{stats.totalApplications}</Typography>
                <Typography variant="body2" color="text.secondary">
                  +{Math.round(stats.totalApplications * 0.1)} this week
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MoneyIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Amount</Typography>
                </Box>
                <Typography variant="h4">
                  ₹{(stats.totalAmount / 10000000).toFixed(2)}Cr
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +12.5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Average Risk Score</Typography>
                </Box>
                <Typography variant="h4">{Math.round(stats.averageRisk)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Below target threshold
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WarningIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6">High Risk Applications</Typography>
                </Box>
                <Typography variant="h4">{stats.highRiskCount}</Typography>
                <Typography variant="body2" color="text.secondary">
                  +7% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <TextField
                placeholder="Search by Loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ width: 300 }}
              />
              <Box>
                <Button
                  variant={filterRisk === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setFilterRisk('all')}
                  sx={{ mr: 1 }}
                >
                  All Applications
                </Button>
                <Button
                  variant={filterRisk === 'high' ? 'contained' : 'outlined'}
                  onClick={() => setFilterRisk('high')}
                  color="error"
                  sx={{ mr: 1 }}
                >
                  High Risk
                </Button>
              </Box>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan ID</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Credit Score</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell align="center">Risk Score</TableCell>
                    <TableCell align="center">Risk Level</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.loanId}>
                      <TableCell>{app.loanId}</TableCell>
                      <TableCell align="right">₹{app.loanAmount.toLocaleString()}</TableCell>
                      <TableCell align="right">{app.creditScore}</TableCell>
                      <TableCell>{app.loanPurpose}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            bgcolor: getRiskColor(app.riskRating),
                            color: 'white',
                            p: 1,
                            borderRadius: 1,
                            display: 'inline-block',
                            minWidth: 40,
                          }}
                        >
                          {app.riskRating}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={app.riskRating > 60 ? 'High' : app.riskRating > 30 ? 'Medium' : 'Low'}
                          color={app.riskRating > 60 ? 'error' : app.riskRating > 30 ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setSelectedApp(app)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={!!selectedApp} onClose={() => setSelectedApp(null)}>
          <DialogTitle>Review Application</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Loan ID: {selectedApp?.loanId}
            </Typography>
            <Typography color="text.secondary" paragraph>
              Risk Score: {selectedApp?.riskRating}
            </Typography>
            <Typography paragraph>
              Please review the application and select an action:
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleStatusUpdate(selectedApp?._id, 'Rejected')}
              color="error"
            >
              Reject
            </Button>
            <Button
              onClick={() => handleStatusUpdate(selectedApp?._id, 'Flagged')}
              color="warning"
            >
              Flag for Review
            </Button>
            <Button
              onClick={() => handleStatusUpdate(selectedApp?._id, 'Approved')}
              color="success"
              variant="contained"
            >
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Dashboard; 