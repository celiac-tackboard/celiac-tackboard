const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {};

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  post_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'location',
      key: 'id'
    }
  }
},
{
  sequelize,
  timestamps: true,
  freezeTableName: false,
  underscored: true,
  modelName: 'post'
})

module.exports = Post;