const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const UserFollowing = sequelize.define('UserFollowing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});      

module.exports = UserFollowing;
