const User = require('../Models/user'); 
const { sign } = require('jsonwebtoken');
const dotenv = require('dotenv').config();  

// Register user
async function register(req, res) {
    const { username, email, password } = req.body; 
    try {
        console.log("Register request received...");

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(400).json({ msg: 'Username already in use' });
        }

        user = await User.create({ username, email, password });

        const payload = {
            user: {
                id: user.id,
            },
        };

        console.log("JWT Payload:", payload);

        sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: 3600 },
            (err, token) => {
                if (err) {
                    console.log("JWT Sign Error:", err.message);
                    throw err;
                }
                console.log("Generated JWT Token:", token);
                res.json({ token });
            }
        );
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).send('Server error');
    }
}

// Login user
async function login(req, res) {
    const { email, password } = req.body;
    try {
        console.log("Login request received...");

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role 
            },
        };

        console.log("JWT Payload:", payload);

        sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) {
                    console.log("JWT Sign Error:", err.message);
                    throw err;
                }
                console.log("Generated JWT Token:", token);
                res.json({ token });
            }
        );
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    register,
    login,
};
