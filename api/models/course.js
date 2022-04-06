'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:'A title is require'
        },
        notEmpty:{
          msg:'Please provide a title'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull:{
          msg:'A description is require'
        },
        notEmpty:{
          msg:'Please provide a valid description'
        }
      }    
    },
    estimatedTime: {
        type: DataTypes.STRING, 
      },
    materialsNeeded: {
        type: DataTypes.STRING,
    },
  }, { sequelize });

 //Creates association with User model
 Course.associate = (models) => {
  Course.belongsTo(models.User, {
      foreignKey: {
          fieldName: 'userId',
          allowNull: false,
          validate: {
              notNull : {
                  msg: 'A user ID is required.'
              },
              notEmpty: {
                  msg: 'Please provide a user ID'
              }
          }
      },
  })
}

  return Course;
};