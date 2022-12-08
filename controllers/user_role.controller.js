'use strict';
const db = require("../models");
const UserRole = require("../models/user_role.model.js")(db.sequelize);
const { tableName, schema } = UserRole.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT user_id, role_id FROM ${schema}.${tableName}`;
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
  UserRole.findByPk(id)
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
  const { user_id, role_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const user_role = UserRole.build({
      user_id: user_id,
      role_id: role_id
    });
    await user_role.save({ transaction: t });

    res.status(200).json({ success: true, data: user_role });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { user_id, role_id } = req.body;
  
  UserRole.update({
        user_id: user_id,
role_id: role_id
    },
    {
      where: { role_id: id }
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
  
  UserRole.destroy({
      where: { role_id: id }
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