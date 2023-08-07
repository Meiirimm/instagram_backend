const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Post = require('../../post/Post');

const PostLike = sequelize.define('PostLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

PostLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });
PostLike.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

module.exports = PostLike;
