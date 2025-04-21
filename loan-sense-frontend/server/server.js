const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { predict_risk } = require('./ml/predict');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Loan Schema
const loanSchema = new mongoose.Schema({
    name: String,
    age: Number,
    income: Number,
    loanAmount: Number,
    creditScore: Number,
    monthsEmployed: Number,
    numCreditLines: Number,
    interestRate: Number,
    loanTerm: Number,
    dtiRatio: Number,
    education: String,
    employmentType: String,
    maritalStatus: String,
    hasMortgage: Boolean,
    hasDependents: Boolean,
    loanPurpose: String,
    hasCoSigner: Boolean,
    loanId: String,
    riskRating: Number,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Loan = mongoose.model('Loan', loanSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Generate loan ID
const generateLoanId = () => {
    return `LOAN${Date.now().toString().slice(-6)}`;
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
        const newLoan = new Loan({
            ...loanData,
            loanId,
            riskRating,
            status: 'Pending'
        });

        console.log('Saving loan application to MongoDB...');
        await newLoan.save();
        
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

// Get all loan applications
app.get('/api/loans', async (req, res) => {
    try {
        const loans = await Loan.find().sort({ createdAt: -1 });
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
        
        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        if (!updatedLoan) {
            return res.status(404).json({
                success: false,
                message: 'Loan not found'
            });
        }
        
        res.json({
            success: true,
            data: updatedLoan
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