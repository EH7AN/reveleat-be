
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Foreign key to Users table
        references: {
          model: 'Users', // Name of the Users table
          key: 'id', // The column in the Users table to reference
        },
        onDelete: 'CASCADE', // If a user is deleted, their meals will be deleted as well
        onUpdate: 'CASCADE', // If the user id is updated, it will cascade
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
