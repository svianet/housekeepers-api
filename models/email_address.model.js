// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const email_address = {
    email_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
    email_address: {
        type: DataTypes.STRING
        , allowNull: false
        , validate: { 
            isEmail: true,
            len: [0, 200] 
        }
    },
    pers_id: {
        type: DataTypes.NUMBER
        , allowNull: false
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "email_address";
    const Model = sequelize.define(tableName, email_address, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};