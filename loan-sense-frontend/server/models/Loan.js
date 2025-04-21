const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
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
  dtiRatio: {
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true,
    enum: ['High School', "Bachelor's", "Master's", 'PhD']
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'self-employed', 'unemployed']
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
    enum: ['Pending', 'Approved', 'Rejected', 'Flagged'],
    default: 'Pending'
  },
  riskRating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique loan ID
loanSchema.statics.generateLoanId = async function() {
  const count = await this.countDocuments();
  return `LOAN${String(count + 1).padStart(6, '0')}`;
};

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan; 