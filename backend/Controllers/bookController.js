const path = require('path');
const Book = require('../Models/books');

// Log the path to check if the module is correctly resolved
console.log('Loading Book model from:', path.resolve(__dirname, '../Models/books'));
console.log('Book model loaded successfully!');

// Add a book
exports.addBook = async (req, res) => {
    const { title, author, genre, quantity, isbn, total_copies, available_copies } = req.body;

    // Validate required fields
    if (!title || !author || !isbn || !total_copies || !available_copies || !genre || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const book = await Book.create({
            title,
            author,
            genre,
            quantity,
            isbn,
            total_copies, 
            available_copies, 
        });

        res.status(201).json(book); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll(); 
        res.status(200).json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, quantity, isbn, total_copies, available_copies } = req.body;

    // Validate required fields
    if (!title || !author || !isbn || !total_copies || !available_copies || !genre || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update fields
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.quantity = quantity;
        book.isbn = isbn;
        book.total_copies = total_copies;
        book.available_copies = available_copies;

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

        await book.destroy(); 
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
