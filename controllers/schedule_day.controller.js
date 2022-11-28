'use strict';
const db = require("../models");
const ScheduleDay = require("../models/schedule_day.model.js")(db.sequelize);
const { tableName, schema } = ScheduleDay.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT schedule_day_id, schedule_id, schedule_day, time_start, time_end FROM ${schema}.${tableName}`;
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
  ScheduleDay.findByPk(id)
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
  const { schedule_day_id, schedule_id, schedule_day, time_start, time_end } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const schedule_day = ScheduleDay.build({
        schedule_day_id: schedule_day_id,
schedule_id: schedule_id,
schedule_day: schedule_day,
time_start: time_start,
time_end: time_end
    });
    await schedule_day.save({ transaction: t });

    res.status(200).json({ success: true, data: schedule_day });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { schedule_day_id, schedule_id, schedule_day, time_start, time_end } = req.body;
  
  ScheduleDay.update({
        schedule_day_id: schedule_day_id,
schedule_id: schedule_id,
schedule_day: schedule_day,
time_start: time_start,
time_end: time_end
    },
    {
      where: { schedule_day_id: id }
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
  
  ScheduleDay.destroy({
      where: { schedule_day_id: id }
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