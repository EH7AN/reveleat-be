'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'mobile', {
      type: Sequelize.STRING,
      allowNull: true, // Optional field
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'mobile');
  },
};