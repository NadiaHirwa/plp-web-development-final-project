'use strict';

const bcrypt = require('bcryptjs'); // Require bcrypt for password hashing

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the passwords before inserting them into the database
    const hashedPassword1 = await bcrypt.hash('123', 10);
    const hashedPassword2 = await bcrypt.hash('456', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'Clevin Kabanza',
        email: 'clevin@gmail.com',
        password: hashedPassword1, // Store hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Noel Kalamban',
        email: 'kalamban@gmail.com',
        password: hashedPassword2, // Store hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
