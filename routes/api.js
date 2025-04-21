const express = require('express');
const router = express.Router();
const mockAuth = require('../middleware/auth');
const LoanApplication = require('../models/LoanApplication');

// Login route
router.post('/login', mockAuth, (req, res) => {
    res.json({ role: req.user.role });
});

// Submit loan application
router.post('/applications', mockAuth, async (req, res) => {
    try {
        if (req.user.role !== 'borrower') {
            return res.status(403).json({ message: 'Only borrowers can submit applications' });
        }

        const application = new LoanApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all applications (for loan officers)
router.get('/applications', mockAuth, async (req, res) => {
    try {
        if (req.user.role !== 'officer') {
            return res.status(403).json({ message: 'Only loan officers can view applications' });
        }

        const applications = await LoanApplication.find()
            .select('loanId loanAmount riskRating status')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update application status
router.put('/applications/:id', mockAuth, async (req, res) => {
    try {
        if (req.user.role !== 'officer') {
            return res.status(403).json({ message: 'Only loan officers can update applications' });
        }

        const { status } = req.body;
        const application = await LoanApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 