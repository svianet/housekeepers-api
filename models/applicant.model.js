// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const applicant = {
    
};

module.exports = (sequelize) => {
    let schema = "null";
    let tableName = "applicant";
    const Model = sequelize.define(tableName, applicant, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};