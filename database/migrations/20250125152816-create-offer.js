module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Offers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Meals', // Name of the Meals table
          key: 'id', // The column in the Meals table to reference
        },
        onDelete: 'CASCADE', // If the associated meal is deleted, the offer will be deleted as well
        onUpdate: 'CASCADE',
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Addresses', // Name of the Addresses table
          key: 'id', // The column in the Addresses table to reference
        },
        onDelete: 'CASCADE', // If the associated address is deleted, the offer will be deleted
        onUpdate: 'CASCADE',
      },
      order_open_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      delivery_start_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      delivery_complete_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      available_servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('Offers');
  },
};
