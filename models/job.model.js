// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const job = {
    job_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true        
    },
    job_type: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { len: [0, 1] }
    },
    start_date: {
        type: DataTypes.DATE
        , allowNull: true
    },
    frequency: {
        type: DataTypes.STRING
        , allowNull: false
    },
    days: {
        type: DataTypes.STRING
        , allowNull: true
        , validate: { len: [0, 7] }
    },
    zipcode: {
        type: DataTypes.STRING
        , allowNull: false
    },
    bedrooms: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    bathrooms: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    have_pets: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    sq_footage: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    provide_supplies: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    provide_equipment: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    hour_rate_start: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    hour_rate_end: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    end_date: {
        type: DataTypes.DATE
        , allowNull: true
    },
    user_id: {
        type: DataTypes.NUMBER
        , allowNull: false
    },
    job_description: {
        type: DataTypes.STRING
        , allowNull: true
    },
    job_status: {
        type: DataTypes.STRING
        , allowNull: true
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "job";
    const Model = sequelize.define(tableName, job, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};