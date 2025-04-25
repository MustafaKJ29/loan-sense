import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

function LoanComparison() {
  const [loans, setLoans] = useState([
    {
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      monthlyPayment: null,
      totalPayment: null,
      totalInterest: null
    },
    {
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      monthlyPayment: null,
      totalPayment: null,
      totalInterest: null
    }
  ]);

  const handleInputChange = (index, field, value) => {
    const newLoans = [...loans];
    newLoans[index] = {
      ...newLoans[index],
      [field]: value
    };
    setLoans(newLoans);
  };

  const calculateLoan = (index) => {
    const loan = loans[index];
    const P = parseFloat(loan.loanAmount);
    const r = parseFloat(loan.interestRate) / 100 / 12;
    const n = parseFloat(loan.loanTerm) * 12;

    if (P && r && n) {
      const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - P;

      const newLoans = [...loans];
      newLoans[index] = {
        ...loan,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      };
      setLoans(newLoans);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loan Comparison
      </Typography>
      <Grid container spacing={3}>
        {loans.map((loan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Loan Option {index + 1}
                </Typography>
                <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                  <TextField
                    fullWidth
                    label="Loan Amount"
                    type="number"
                    value={loan.loanAmount}
                    onChange={(e) => handleInputChange(index, 'loanAmount', e.target.value)}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Interest Rate"
                    type="number"
                    value={loan.interestRate}
                    onChange={(e) => handleInputChange(index, 'interestRate', e.target.value)}
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Loan Term (Years)"
                    type="number"
                    value={loan.loanTerm}
                    onChange={(e) => handleInputChange(index, 'loanTerm', e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => calculateLoan(index)}
                  >
                    Calculate
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loans.some(loan => loan.monthlyPayment) && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Comparison</TableCell>
                <TableCell align="right">Loan Option 1</TableCell>
                <TableCell align="right">Loan Option 2</TableCell>
                <TableCell align="right">Difference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Monthly Payment</TableCell>
                <TableCell align="right">
                  {loans[0].monthlyPayment ? `$${loans[0].monthlyPayment}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[1].monthlyPayment ? `$${loans[1].monthlyPayment}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[0].monthlyPayment && loans[1].monthlyPayment
                    ? `$${Math.abs(loans[0].monthlyPayment - loans[1].monthlyPayment).toFixed(2)}`
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Payment</TableCell>
                <TableCell align="right">
                  {loans[0].totalPayment ? `$${loans[0].totalPayment}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[1].totalPayment ? `$${loans[1].totalPayment}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[0].totalPayment && loans[1].totalPayment
                    ? `$${Math.abs(loans[0].totalPayment - loans[1].totalPayment).toFixed(2)}`
                    : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Interest</TableCell>
                <TableCell align="right">
                  {loans[0].totalInterest ? `$${loans[0].totalInterest}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[1].totalInterest ? `$${loans[1].totalInterest}` : '-'}
                </TableCell>
                <TableCell align="right">
                  {loans[0].totalInterest && loans[1].totalInterest
                    ? `$${Math.abs(loans[0].totalInterest - loans[1].totalInterest).toFixed(2)}`
                    : '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default LoanComparison; 