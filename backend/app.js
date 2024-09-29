const express = require('express');
const { connectDB } = require('./Config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;