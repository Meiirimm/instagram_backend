const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Story = require('../../story/Story');

const StoryLike = sequelize.define('StoryLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Устанавливаем связь между StoryLike и User моделями
StoryLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Устанавливаем связь между StoryLike и Story моделями
StoryLike.belongsTo(Story, { foreignKey: 'storyId', as: 'story' });

module.exports = StoryLike;
