const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {};

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comment_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: false,
  underscored: true,
  modelName: 'comment'
});

module.exports = Comment;