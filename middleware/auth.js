const mockAuth = (req, res, next) => {
    const { username, password } = req.body;

    // Mock authentication
    if (username === 'borrower' && password === '123') {
        req.user = { role: 'borrower' };
        return next();
    }
    if (username === 'officer' && password === '234') {
        req.user = { role: 'officer' };
        return next();
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = mockAuth; 