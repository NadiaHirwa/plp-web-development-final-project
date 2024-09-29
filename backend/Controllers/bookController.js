const path = require('path');
const Book = require('../Models/books');

// Log the path to check if the module is correctly resolved
console.log('Loading Book model from:', path.resolve(__dirname, '../Models/books'));
console.log('Book model loaded successfully!');

// Add a book
exports.addBook = async (req, res) => {
    const { title, author, isbn, publication_year, total_copies } = req.body;

    try {
        const book = await Book.create({
            title,
            author,
            isbn,
            publication_year,
            total_copies,
            available_copies: total_copies,
        });

        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll(); // Fetch all books
        res.status(200).json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, publication_year, total_copies } = req.body;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title;
        book.author = author;
        book.isbn = isbn;
        book.publication_year = publication_year;
        book.total_copies = total_copies;
        book.available_copies = total_copies;

        await book.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.destroy(); // Delete the book
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
