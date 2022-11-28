'use strict';
const db = require("../models");
const Account = require("../models/account.model.js")(db.sequelize);
const Person = require("../models/person.model.js")(db.sequelize);
const { ACCOUNT } = require('../util/constants');
const { tableName, schema } = Account.options;

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
  Account.findByPk(id)
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

// we will manager all transactions and relationships. This approach will give us more flexibility and performance
const create = async (req, res, next) => {
  const { email, first_name, last_name } = req.body;
  const t = await db.sequelize.transaction();
  try {
    // needs save a person too (if not could use this line => build + save)
    const person = Person.build({ 
      first_name: first_name,
      last_name: last_name
    });
    await person.save({ transaction: t });
    
    // create a account pending of validation
    const account = Account.build({ 
      email: email,
      pers_id: person.pers_id
    });
    await account.save({ transaction: t });
    
    res.status(200).json({ success: true, data: account });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  const { email, failed_access } = req.body; // json data
  
  Account.update({
      email: email,
      failed_access: failed_access
    },
    {
      where: { user_id: id }
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
  
  Account.destroy({
      where: { user_id: id }
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

const approve = async (req, res, next) => {
  const { id } = req.body; // but get parameters
  
  Account.update({
      account_status: ACCOUNT.VALIDATED
    },
    {
      where: { user_id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot validate the account with id=${id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
}

const reject = async (req, res, next) => {
  const { id } = req.body;
  
  Account.update({
      account_status: ACCOUNT.BLOCKED
    },
    {
      where: { user_id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot blocked the account with id=${id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  findAll, findOne, create, update, remove, approve, reject
};