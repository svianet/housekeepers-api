// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const schedule = {
    schedule_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
user_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    },
creation_date: {

        type: DataTypes.DATE
        , allowNull: false
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "schedule";
    const Model = sequelize.define(tableName, schedule, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};