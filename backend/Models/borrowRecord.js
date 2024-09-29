const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/db');

const BorrowRecord = sequelize.define('BorrowRecord', {
    borrow_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
    },
});

module.exports = BorrowRecord;
