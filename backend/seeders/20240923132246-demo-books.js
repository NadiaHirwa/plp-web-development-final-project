'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'Watoto wa Mama Ntilie',
        author: 'Emmanuel Mbogo',
        genre: 'Fiction',
        quantity: 5,
        isbn: '978-3-16-148410-0', 
        total_copies: 10,          
        available_copies: 5,       
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ngoswe Penzi Kitovu cha Uzembe',
        author: 'Edwin Semzaba',
        genre: 'Fiction',
        quantity: 3,
        isbn: '978-1-234-56789-7',
        total_copies: 5,           
        available_copies: 2,        
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
