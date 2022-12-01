// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const user_role = {
    user_id: {
        type: DataTypes.NUMBER
        , allowNull: false        
        , primaryKey: true        
    },
    role_id: {
        type: DataTypes.NUMBER
        , allowNull: false        
        , primaryKey: true        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "user_role";
    const Model = sequelize.define(tableName, user_role, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};