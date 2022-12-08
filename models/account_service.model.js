// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const account_service = {
    user_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true   
    },
    service_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true   
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "account_service";
    const Model = sequelize.define(tableName, account_service, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};