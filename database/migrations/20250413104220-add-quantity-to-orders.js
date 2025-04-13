'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, // Default to 1 dish if not specified
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Orders', 'quantity');
  },
};