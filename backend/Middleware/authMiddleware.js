const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Unauthorized' });
    }

    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token. Unauthorized' });
        }

        // Store user info from token in the request object
        req.user = decoded;
        next();
    });
}

module.exports = { isAuthenticated };