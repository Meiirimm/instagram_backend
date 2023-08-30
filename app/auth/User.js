const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const UserFollowing = require('../user/models/UserFollowing')


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false, // Отключение автоматического добавления полей createdAt и updatedAt
}
);

// Определение связи "многие ко многим" между моделями User с использованием промежуточной модели UserFollowing

// Связь "подписчики" - Пользователь имеет множество "подписчиков"
User.belongsToMany(User, {
  through: UserFollowing, // Используется промежуточная модель UserFollowing
  as: 'followers', // Атрибут для доступа к коллекции подписчиков
  foreignKey: 'followingId', // Внешний ключ, связывающий текущего пользователя (подписываемого)
});

// Связь "подписки" - Пользователь имеет множество "подписок"
User.belongsToMany(User, {
  through: UserFollowing, // Используется промежуточная модель UserFollowing
  as: 'followings', // Атрибут для доступа к коллекции подписок
  foreignKey: 'followerId', // Внешний ключ, связывающий пользователя, который осуществляет подписку
});


module.exports = User;
