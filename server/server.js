const express = require('express');
const cors = require('cors');
const { predict_risk } = require('./ml/predict');
const { generateSampleData } = require('./data/sampleData');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// In-memory storage with sample data
let loans = generateSampleData();
let loanCounter = loans.length;

// Generate loan ID
const generateLoanId = () => {
  loanCounter++;
  return `LOAN${String(loanCounter).padStart(6, '0')}`;
};

// Submit new loan application
app.post('/api/loan/assess', async (req, res) => {
  try {
    console.log('Received loan application:', req.body);
    const loanData = req.body;
    
    // Convert string booleans to actual booleans
    loanData.hasMortgage = loanData.hasMortgage === 'true';
    loanData.hasDependents = loanData.hasDependents === 'true';
    loanData.hasCoSigner = loanData.hasCoSigner === 'true';
    
    // Calculate risk rating using mock model
    console.log('Calculating risk rating...');
    const riskRating = Math.floor(Math.random() * 100); // Mock risk calculation
    
    // Generate loan ID
    const loanId = generateLoanId();
    
    // Create new loan application
    const newLoan = {
      ...loanData,
      loanId,
      riskRating,
      status: 'Pending',
      createdAt: new Date(),
      documents: [],
      notes: [],
      userId: `USER${String(loanCounter).padStart(6, '0')}`
    };

    console.log('Saving loan application...');
    loans.push(newLoan);
    console.log('Loan application saved successfully');
    
    res.json({
      success: true,
      message: 'Loan application submitted successfully',
      data: {
        loanId,
        riskRating
      }
    });
  } catch (error) {
    console.error('Error processing loan application:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing loan application',
      error: error.message
    });
  }
});

// Get all loan applications with filtering
app.get('/api/loans', async (req, res) => {
  try {
    const { search, status, startDate, endDate, minAmount, maxAmount } = req.query;
    let filteredLoans = [...loans];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredLoans = filteredLoans.filter(loan => 
        loan.name.toLowerCase().includes(searchLower) ||
        loan.loanId.toLowerCase().includes(searchLower)
      );
    }

    if (status) {
      filteredLoans = filteredLoans.filter(loan => loan.status === status);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredLoans = filteredLoans.filter(loan => {
        const loanDate = new Date(loan.createdAt);
        return loanDate >= start && loanDate <= end;
      });
    }

    if (minAmount) {
      filteredLoans = filteredLoans.filter(loan => loan.loanAmount >= Number(minAmount));
    }

    if (maxAmount) {
      filteredLoans = filteredLoans.filter(loan => loan.loanAmount <= Number(maxAmount));
    }

    filteredLoans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: filteredLoans
    });
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loans',
      error: error.message
    });
  }
});

// Get user's loan applications
app.get('/api/loans/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userLoans = loans.filter(loan => loan.userId === userId);
    userLoans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: userLoans
    });
  } catch (error) {
    console.error('Error fetching user loans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user loans',
      error: error.message
    });
  }
});

// Update loan status
app.put('/api/loan/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const loanIndex = loans.findIndex(loan => loan.loanId === id);
    
    if (loanIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }
    
    loans[loanIndex].status = status;
    
    res.json({
      success: true,
      data: loans[loanIndex]
    });
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating loan status',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 