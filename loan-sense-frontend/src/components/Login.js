import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'borrower'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll just simulate authentication
      // In a real app, you would make an API call here
      localStorage.setItem('userRole', formData.role);
      
      // Redirect based on role
      if (formData.role === 'borrower') {
        navigate('/borrower/apply');
      } else {
        navigate('/officer');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }} elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" align="center">
            Loan Sense
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Sign in to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Sign in as:
              </Typography>
              <RadioGroup
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  value="borrower"
                  control={<Radio />}
                  label="Borrower"
                />
                <FormControlLabel
                  value="officer"
                  control={<Radio />}
                  label="Loan Officer"
                />
              </RadioGroup>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login; 