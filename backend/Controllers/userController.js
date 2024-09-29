const User = require('../Models/user'); // Ensure you have the correct path to your User model
const { sign } = require('jsonwebtoken');

// Register user
async function register(req, res) {
    const { username, email, password } = req.body; // Email is included here
    try {
        // Check if user with the same email exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        // Check if user with the same username exists
        user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(400).json({ msg: 'Username already in use' });
        }

        // Create user including the email
        user = await User.create({ username, email, password });

        const payload = {
            user: {
                id: user.id,
            },
        };

        sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Login user
async function login(req, res) {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password); // Ensure you have a comparePassword method in your User model
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role // Assuming the User model has a role field
            },
        };

        sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Other user-related functions can be added here (e.g., getUserDetails, updateUser, deleteUser, etc.)

module.exports = {
    register,
    login,
    // export other functions as needed
};
