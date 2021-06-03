const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
              }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location'
    }
);

module.exports = Location;