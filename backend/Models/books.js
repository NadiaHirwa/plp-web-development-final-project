const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/db');

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
    publication_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available_copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Book;
