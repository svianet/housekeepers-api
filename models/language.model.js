// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const language = {
    lang_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
language_name: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 100] }
    },
language_code: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 10] }
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "language";
    const Model = sequelize.define(tableName, language, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};