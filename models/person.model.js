// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin
const { DataTypes } = require("sequelize"); // Import the built-in data types
const person = {
  pers_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2,100]
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2,100]
    }
  },
  birthday: {
    type: DataTypes.DATE,
    validate: {
      isDate: true,
      greaterThan18(value) {
        let referenceDate = dayjs().subtract(18, 'year');
        dayjs.extend(isSameOrAfter);
        if (value !== null && dayjs(value).isSameOrAfter(referenceDate)) {
          throw new Error("You need to be 18 years old or more!");
        }
      }
    }
  },
  gender: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['F', 'M']],
    }
  },
  bio: {
    type: DataTypes.STRING,
    validate: {
      len: [20,2000]
    }
  },
  full_name: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
};

module.exports = (sequelize) => {
  let schema = "public";
  let tableName = "person";
  const Model = sequelize.define(tableName, person, {
    timestamps: false,
    tableName: tableName,
    schema: schema
  });
  return Model;
};