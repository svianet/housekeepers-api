// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const account_config = {
    config_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true        
    },
    user_id: {
        type: DataTypes.NUMBER
        , allowNull: false   
    },
    hour_rate_start: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    hour_rate_end: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    years_experience: {
        type: DataTypes.NUMBER
        , allowNull: true
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "account_config";
    const Model = sequelize.define(tableName, account_config, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};