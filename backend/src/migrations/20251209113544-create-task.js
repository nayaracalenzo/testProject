'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 await queryInterface.createTable( "Task", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },

    title: {
      type: Sequelize.STRING(255), 
      allowNull: false,
    },

    completed: {
      type: Sequelize.BOOLEAN, 
      allowNull: false,
      defaultValue: false,
    },
  },);
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('users');
  }
};
