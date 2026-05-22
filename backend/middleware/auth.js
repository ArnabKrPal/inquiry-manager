const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Look for the VIP pass
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    // 2. Verify the pass
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user ID to the request so our routes can use it!
        next(); // Let them through to the route
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};