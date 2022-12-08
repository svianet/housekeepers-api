// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const schedule_day = {
    schedule_day_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true        
    },
    schedule_id: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    schedule_day: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { len: [0, 1] }
    },
    time_start: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { len: [0, 5] }
    },
    time_end: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { len: [0, 5] }
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "schedule_day";
    const Model = sequelize.define(tableName, schedule_day, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};