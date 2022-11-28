// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const role = {
    role_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
role_name: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "role";
    const Model = sequelize.define(tableName, role, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};