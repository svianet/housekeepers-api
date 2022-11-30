// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const address = {
    adress_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
street_line1: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        , validate: { len: [0, 100] }
    },
street_line2: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        
    },
neighborhood: {

        type: DataTypes.STRING
        , allowNull: true
        
        
        
    },
city: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        
    },
state: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 2] }
    },
zipcode: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        
    },
pers_id: {

        type: DataTypes.NUMBER
        , allowNull: true
        
        
        
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "address";
    const Model = sequelize.define(tableName, address, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};