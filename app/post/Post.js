const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

// Устанавливаем связь с моделью User
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });


module.exports = Post;
