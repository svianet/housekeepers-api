'use strict';
const db = require("../models");
const ServiceCompletion = require("../models/service_completion.model.js")(db.sequelize);
const { tableName, schema } = ServiceCompletion.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT service_comp_id, service_comp_status, job_id, user_id, review, start_date, end_date, confirmation_code, appointment_id, confirmation_date FROM ${schema}.${tableName}`;
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
  ServiceCompletion.findByPk(id)
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
  const { service_comp_id, service_comp_status, job_id, user_id, review, start_date, end_date, confirmation_code, appointment_id, confirmation_date } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const service_completion = ServiceCompletion.build({
        service_comp_id: service_comp_id,
service_comp_status: service_comp_status,
job_id: job_id,
user_id: user_id,
review: review,
start_date: start_date,
end_date: end_date,
confirmation_code: confirmation_code,
appointment_id: appointment_id,
confirmation_date: confirmation_date
    });
    await service_completion.save({ transaction: t });

    res.status(200).json({ success: true, data: service_completion });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { service_comp_id, service_comp_status, job_id, user_id, review, start_date, end_date, confirmation_code, appointment_id, confirmation_date } = req.body;
  
  ServiceCompletion.update({
        service_comp_id: service_comp_id,
service_comp_status: service_comp_status,
job_id: job_id,
user_id: user_id,
review: review,
start_date: start_date,
end_date: end_date,
confirmation_code: confirmation_code,
appointment_id: appointment_id,
confirmation_date: confirmation_date
    },
    {
      where: { service_comp_id: id }
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
  
  ServiceCompletion.destroy({
      where: { service_comp_id: id }
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