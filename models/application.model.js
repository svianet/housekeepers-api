// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const application = {
    job_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true        
    },
    user_id: {
        type: DataTypes.NUMBER
        , allowNull: false
        , primaryKey: true        
    },
    application_status: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { len: [0, 1] }
    },
    application_date: {
        type: DataTypes.DATE
        , allowNull: false
    },
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "application";
    const Model = sequelize.define(tableName, application, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};