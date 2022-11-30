// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const service = {
    service_id: {

        type: DataTypes.NUMBER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
        
    },
service_name: {

        type: DataTypes.STRING
        , allowNull: false
        
        
        , validate: { len: [0, 200] }
    }
};

module.exports = (sequelize) => {
    let schema = "public";
    let tableName = "service";
    const Model = sequelize.define(tableName, service, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};