// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const person_language = {
    lang_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true
    },
    pers_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "person_language";
    const Model = sequelize.define(tableName, person_language, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};