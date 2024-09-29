const express = require('express');
const router = express.Router();
const { addBook, getBooks, updateBook, deleteBook } = require('../Controllers/bookController');
const { isAuthenticated } = require('../Middleware/authMiddleware'); // Make sure to import your middleware

// @route   POST /api/books
// @desc    Add a book
// @access  Private
router.post('/', isAuthenticated, addBook);

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getBooks);

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', isAuthenticated, updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', isAuthenticated, deleteBook);

module.exports = router;
