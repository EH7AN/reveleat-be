'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Meals', 'photo_uri', {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Meals', 'photo_uri', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
