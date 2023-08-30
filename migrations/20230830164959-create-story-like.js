'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StoryLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Имя таблицы Users
          key: 'id', // Поле для связи
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      storyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stories', // Имя таблицы Stories
          key: 'id', // Поле для связи
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StoryLikes');
  },
};
