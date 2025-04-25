import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitLoanApplication = async (formData) => {
  try {
    const response = await api.post('/api/loan/assess', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserLoans = async (userId) => {
  try {
    const response = await api.get(`/api/loans/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllLoans = async (filters = {}) => {
  try {
    const response = await api.get('/api/loans', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateLoanStatus = async (loanId, status) => {
  try {
    const response = await api.put(`/api/loan/${loanId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 