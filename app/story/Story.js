const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User'); 

const Story = sequelize.define('Story', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Story.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Story;
