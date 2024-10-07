const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    console.log("Entering isAuthenticated middleware...");

    const token = req.headers['authorization'];
    console.log("Authorization header:", token);

    if (!token) {
        console.log("No token provided.");
        return res.status(401).json({ message: 'No token provided. Unauthorized' });
    }

    // Extract token from the 'Bearer <token>' format
    const tokenWithoutBearer = token.split(' ')[1];
    console.log("Token without 'Bearer':", tokenWithoutBearer);

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ message: 'Failed to authenticate token. Unauthorized' });
        }

        // Store user info from token in the request object
        console.log("Token successfully verified. Decoded token:", decoded);
        req.user = decoded;
        next();
    });
}

module.exports = { isAuthenticated };
