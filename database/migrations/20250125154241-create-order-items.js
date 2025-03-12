module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItems', {
      id: {
        type: Sequelize.UUID, // Change to UUID
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUIDs
      },
      order_id: {
        type: Sequelize.UUID, // Ensure order_id is also UUID
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      offer_id: {
        type: Sequelize.UUID, // Ensure offer_id is UUID
        allowNull: false,
        references: {
          model: 'Offers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('TO_BE_DELIVERED', 'DELIVERING', 'DELIVERED'),
        allowNull: false,
        defaultValue: 'TO_BE_DELIVERED',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('OrderItems');
  },
};
