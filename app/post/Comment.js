const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Устанавливаем связь с моделями User и Post
// Устанавливаем связь, что комментарий принадлежит пользователю
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Устанавливаем связь, что комментарий принадлежит посту
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

// Устанавливаем связь, что у поста может быть много комментариев
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });

module.exports = Comment;
