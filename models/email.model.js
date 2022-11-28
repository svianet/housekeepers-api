// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const email = {
    
};

module.exports = (sequelize) => {
    let schema = "null";
    let tableName = "email";
    const Model = sequelize.define(tableName, email, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};