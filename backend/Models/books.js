const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/db');

// Define the Book model
const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    genre: { 
        type: DataTypes.STRING,
        allowNull: true, 
    },
    total_copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available_copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Book',   
    tableName: 'books', 
});

module.exports = Book;
