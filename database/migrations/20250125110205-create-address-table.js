'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.DataTypes.UUID, // Change to UUID
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUIDs
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      latitude: {
        type: Sequelize.DataTypes.DECIMAL(10, 7),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DataTypes.DECIMAL(10, 7),
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      zip: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  },
};
