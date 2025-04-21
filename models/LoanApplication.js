const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    loanId: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    creditScore: {
        type: Number,
        required: true
    },
    monthsEmployed: {
        type: Number,
        required: true
    },
    numCreditLines: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    loanTerm: {
        type: Number,
        required: true
    },
    dtiRatio: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    hasMortgage: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    hasDependents: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    loanPurpose: {
        type: String,
        required: true
    },
    hasCoSigner: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    default: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Flagged'],
        default: 'Pending'
    },
    riskRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema); 