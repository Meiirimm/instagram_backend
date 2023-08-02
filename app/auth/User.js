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

User.belongsToMany(User, {
  through: UserFollowing,
  as: 'followers',
  foreignKey: 'followingId',
});

User.belongsToMany(User, {
  through: UserFollowing,
  as: 'followings',
  foreignKey: 'followerId',
});


module.exports = User;
