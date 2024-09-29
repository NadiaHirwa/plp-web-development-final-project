'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BorrowRecords', [
      {
        userId: 1,
        bookId: 1,
        borrowDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        bookId: 2,
        borrowDate: new Date(),
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BorrowRecords', null, {});
  }
};
