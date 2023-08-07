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

CommentLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });
CommentLike.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' });

module.exports = CommentLike;
