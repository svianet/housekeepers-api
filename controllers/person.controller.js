'use strict';
const db = require("../models");
const Person = require("../models/person.model.js")(db.sequelize, 'public', 'person');
const { tableName, schema } = Person.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT * FROM ${schema}.${tableName}`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: `Cannot find records.` });
      }
    })
    .catch(err => {
      next(err)
    });
};

// operations using the ORM (insert, update, delete, findByPk)
const findOne = async (req, res, next) => {
  const { id } = req.params;
  Person.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(400).send({ success: false, message: `Cannot find record with id=${id}.` });
      }
    })
    .catch(err => {
      next(err)
    });
};

const create = async (req, res, next) => {
  const { first_name, last_name, birthday, gender, bio } = req.body;
  const t = await db.sequelize.transaction();
  try {
    // needs to save other person information
    const person = Person.build({ 
      first_name: first_name, 
      last_name: last_name, 
      birthday: birthday, 
      gender: gender, 
      bio: bio
    });
    await person.save({ transaction: t });

    res.status(200).json({ success: true, data: person });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  const { first_name, last_name, birthday, gender, bio } = req.body;
  
  Person.update({
      first_name: first_name, 
      last_name: last_name, 
      birthday: birthday, 
      gender: gender, 
      bio: bio
    },
    {
      where: { pers_id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot update the record with id=${id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  
  Person.destroy({
      where: { pers_id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot delete record with id=${id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  findAll, findOne, create, update, remove
};
