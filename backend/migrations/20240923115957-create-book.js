'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genre: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      total_copies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,  
      },
      available_copies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Books');
  },
};
