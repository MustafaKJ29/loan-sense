const express = require('express');
const cors = require('cors');
const { predict_risk } = require('./ml/predict');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let loans = [];
let loanCounter = 0;

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
        const riskPrediction = predict_risk(loanData);
        const riskRating = riskPrediction.risk_rating;
        
        // Generate loan ID
        const loanId = generateLoanId();
        
        // Create new loan application
        const newLoan = {
            ...loanData,
            loanId,
            riskRating,
            status: 'Pending',
            createdAt: new Date()
        };

        console.log('Saving loan application...');
        loans.push(newLoan);
        console.log('Loan application saved successfully');
        
        res.status(201).json({
            success: true,
            message: 'Loan application submitted successfully',
            data: {
                loanId,
                riskRating,
                riskCategory: riskPrediction.risk_category
            }
        });
    } catch (error) {
        console.error('Error submitting loan application:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting loan application',
            error: error.message
        });
    }
});

// Get all loan applications
app.get('/api/loans', async (req, res) => {
    try {
        console.log('Fetching all loan applications...');
        console.log(`Found ${loans.length} loan applications`);
        res.json({
            success: true,
            data: loans
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

// Update loan status
app.put('/api/loan/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`Updating loan ${id} status to ${status}`);
        const loanIndex = loans.findIndex(loan => loan.loanId === id);
        
        if (loanIndex === -1) {
            console.log(`Loan ${id} not found`);
            return res.status(404).json({
                success: false,
                message: 'Loan not found'
            });
        }

        loans[loanIndex].status = status;
        console.log(`Loan ${id} status updated successfully`);
        
        res.json({
            success: true,
            message: 'Loan status updated successfully',
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
    console.log(`Server is running on port ${PORT}`);
}); 