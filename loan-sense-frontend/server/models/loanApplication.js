const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  loanId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
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
  employmentType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'self-employed', 'unemployed']
  },
  education: {
    type: String,
    required: true,
    enum: ['High School', "Bachelor's", "Master's", 'PhD']
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['Single', 'Married', 'Divorced']
  },
  hasMortgage: {
    type: Boolean,
    required: true
  },
  hasDependents: {
    type: Boolean,
    required: true
  },
  loanPurpose: {
    type: String,
    required: true,
    enum: ['home', 'business', 'education', 'auto', 'other']
  },
  hasCoSigner: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected', 'Flagged for Review'],
    default: 'Pending'
  },
  riskRating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
loanApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema); 