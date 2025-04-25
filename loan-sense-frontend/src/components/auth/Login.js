import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const { role } = JSON.parse(currentUser);
      navigate(role === 'borrower' ? '/borrower' : '/officer');
    }

    // Initialize borrower test users if not exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const testUsers = [
        {
          name: 'John Smith',
          email: 'john.smith@test.com',
          password: 'password123',
          role: 'borrower'
        },
        {
          name: 'Sarah Johnson',
          email: 'sarah.j@test.com',
          password: 'password123',
          role: 'borrower'
        },
        {
          name: 'Michael Brown',
          email: 'michael.b@test.com',
          password: 'password123',
          role: 'borrower'
        },
        {
          name: 'Emily Davis',
          email: 'emily.d@test.com',
          password: 'password123',
          role: 'borrower'
        },
        {
          name: 'David Wilson',
          email: 'david.w@test.com',
          password: 'password123',
          role: 'borrower'
        }
      ];
      localStorage.setItem('users', JSON.stringify(testUsers));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation
      if (!formData.email || !formData.password || !formData.role) {
        throw new Error('Please fill in all fields');
      }

      // Special handling for loan officer
      if (formData.role === 'officer') {
        if (formData.email === 'officer@test.com' && formData.password === 'password124') {
          localStorage.setItem('currentUser', JSON.stringify({
            email: 'officer@test.com',
            role: 'officer',
            name: 'Loan Officer'
          }));
          navigate('/officer');
          return;
        } else {
          throw new Error('Invalid loan officer credentials');
        }
      }

      // Handle borrower login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email);

      if (!user || user.password !== formData.password) {
        throw new Error('Invalid email or password');
      }

      // Store borrower info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        role: 'borrower',
        name: user.name
      }));

      navigate('/borrower');
    } catch (err) {
      setError(err.message);
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
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to LoanSense
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="borrower">Borrower</MenuItem>
                <MenuItem value="officer">Loan Officer</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            {formData.role === 'borrower' && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button
                    color="primary"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login; 