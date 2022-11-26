// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize, schema, tableName) => {
    const Model = sequelize.define(tableName, {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      failed_access: {
        type: DataTypes.NUMBER
      },
      pers_id: {
        type: DataTypes.NUMBER
      },
      account_status: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: false,
      tableName: tableName,
      schema: schema
    });
    return Model;
  };