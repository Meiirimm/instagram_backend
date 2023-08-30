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
// Каждый пост принадлежит пользователю.
// Внешний ключ 'user_id' связывает пост с пользователем.
// Алиас 'user' позволяет обращаться к пользователю через ассоциацию.
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Каждый пользователь имеет множество постов.
// Внешний ключ 'user_id' связывает пользователя с постом.
// Алиас 'posts' позволяет обращаться к постам пользователя через ассоциацию.
User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });


module.exports = Post;
