// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const service_completion = {
    service_comp_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
service_comp_status: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 1] }
    },
job_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    },
user_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    },
review: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        
    },
start_date: {

        type: DataTypes.DATE
        , allowNull: true
        
        
        
    },
end_date: {

        type: DataTypes.DATE
        , allowNull: true
        
        
        
    },
confirmation_code: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 10] }
    },
appointment_id: {

        type: DataTypes.NUMBER
        , allowNull: true
        
        
        
    },
confirmation_date: {

        type: DataTypes.DATE
        , allowNull: true
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "service_completion";
    const Model = sequelize.define(tableName, service_completion, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};