// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const phone = {
    phone_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
phone_number: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 20] }
    },
creation_date: {

        type: DataTypes.DATE
        , allowNull: false
        
        
        
    },
pers_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "phone";
    const Model = sequelize.define(tableName, phone, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};