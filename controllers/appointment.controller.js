'use strict';
const db = require("../models");
const Appointment = require("../models/appointment.model.js")(db.sequelize);
const { tableName, schema } = Appointment.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT appointment_id, appointment_start_date, appointment_end, time_planned, summary, description, user_id, user_id_provider, job_id FROM ${schema}.${tableName}`;
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
  Appointment.findByPk(id)
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
  const { appointment_id, appointment_start_date, appointment_end, time_planned, summary, description, user_id, user_id_provider, job_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const appointment = Appointment.build({
        appointment_id: appointment_id,
appointment_start_date: appointment_start_date,
appointment_end: appointment_end,
time_planned: time_planned,
summary: summary,
description: description,
user_id: user_id,
user_id_provider: user_id_provider,
job_id: job_id
    });
    await appointment.save({ transaction: t });

    res.status(200).json({ success: true, data: appointment });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { appointment_id, appointment_start_date, appointment_end, time_planned, summary, description, user_id, user_id_provider, job_id } = req.body;
  
  Appointment.update({
        appointment_id: appointment_id,
appointment_start_date: appointment_start_date,
appointment_end: appointment_end,
time_planned: time_planned,
summary: summary,
description: description,
user_id: user_id,
user_id_provider: user_id_provider,
job_id: job_id
    },
    {
      where: { appointment_id: id }
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
  
  Appointment.destroy({
      where: { appointment_id: id }
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