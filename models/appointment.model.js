// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const appointment = {
    appointment_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
appointment_start_date: {

        type: DataTypes.DATE
        , allowNull: false
        
        
        
    },
appointment_end: {

        type: DataTypes.DATE
        , allowNull: false
        
        
        
    },
time_planned: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    },
summary: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        
    },
description: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        
    },
user_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    },
user_id_provider: {

        type: DataTypes.NUMBER
        , allowNull: true
        
        
        
    },
job_id: {

        type: DataTypes.NUMBER
        , allowNull: true
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "appointment";
    const Model = sequelize.define(tableName, appointment, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};