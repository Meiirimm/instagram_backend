const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Comment = require('../../post/Comment');

const CommentLike = sequelize.define('CommentLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Устанавливаем связь между CommentLike и User моделями
CommentLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Устанавливаем связь между CommentLike и Comment моделями
CommentLike.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' });

module.exports = CommentLike;
