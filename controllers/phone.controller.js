'use strict';
const db = require("../models");
const Phone = require("../models/phone.model.js")(db.sequelize);
const { tableName, schema } = Phone.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT phone_id, phone_number, creation_date, pers_id FROM ${schema}.${tableName}`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: 'Cannot find records.' });
      }
    })
    .catch(err => {
      next(err)
    });
};

// operations using the ORM (insert, update, delete, findByPk)
const findOne = async (req, res, next) => {
  const { id } = req.params;
  Phone.findByPk(id)
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
  const { phone_id, phone_number, creation_date, pers_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const phone = Phone.build({
        phone_id: phone_id,
phone_number: phone_number,
creation_date: creation_date,
pers_id: pers_id
    });
    await phone.save({ transaction: t });

    res.status(200).json({ success: true, data: phone });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { phone_id, phone_number, creation_date, pers_id } = req.body;
  
  Phone.update({
        phone_id: phone_id,
phone_number: phone_number,
creation_date: creation_date,
pers_id: pers_id
    },
    {
      where: { phone_id: id }
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
  
  Phone.destroy({
      where: { phone_id: id }
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