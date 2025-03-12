module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meals', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo_uri: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Meals');
  },
};
