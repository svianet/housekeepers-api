'use strict';
const db = require("../models");
const Address = require("../models/address.model.js")(db.sequelize);
const { tableName, schema } = Address.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT adress_id, street_line1, street_line2, neighborhood, city, state, zipcode, pers_id FROM ${schema}.${tableName}`;
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
  Address.findByPk(id)
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
  const { adress_id, street_line1, street_line2, neighborhood, city, state, zipcode, pers_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const address = Address.build({
        adress_id: adress_id,
street_line1: street_line1,
street_line2: street_line2,
neighborhood: neighborhood,
city: city,
state: state,
zipcode: zipcode,
pers_id: pers_id
    });
    await address.save({ transaction: t });

    res.status(200).json({ success: true, data: address });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { adress_id, street_line1, street_line2, neighborhood, city, state, zipcode, pers_id } = req.body;
  
  Address.update({
        adress_id: adress_id,
street_line1: street_line1,
street_line2: street_line2,
neighborhood: neighborhood,
city: city,
state: state,
zipcode: zipcode,
pers_id: pers_id
    },
    {
      where: { adress_id: id }
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
  
  Address.destroy({
      where: { adress_id: id }
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