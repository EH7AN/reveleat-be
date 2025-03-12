module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID, // Change to UUID type
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
      },
      user_id: {
        type: Sequelize.DataTypes.UUID, // Ensure UUID type
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      address_id: {
        type: Sequelize.UUID, // Keep INTEGER for now (since Address is not changed yet)
        allowNull: false,
        references: {
          model: 'Addresses',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('BASKET', 'PENDING_PAYMENT', 'PLACED', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'BASKET',
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bank: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_reference: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Orders');
  },
};
