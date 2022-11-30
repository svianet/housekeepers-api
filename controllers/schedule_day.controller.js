'use strict';
const db = require("../models");
const ScheduleConfig = require("../models/schedule_day.model.js")(db.sequelize);
const { tableName, schema } = ScheduleConfig.options;

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

const findOne = async (req, res, next) => {
  const { schedule_id, id } = req.params;
  ScheduleConfig.findOne({
    where: {
      schedule_id: schedule_id,
      schedule_day_id: id
    }
  })
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
  const { schedule_id, schedule_day, time_start, time_end } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const schedule_config = ScheduleConfig.build({
      schedule_id: schedule_id,
      schedule_day: schedule_day,
      time_start: time_start,
      time_end: time_end
    });
    await schedule_config.save({ transaction: t });

    res.status(200).json({ success: true, data: schedule_config });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { schedule_day, time_start, time_end } = req.body;
  
  ScheduleConfig.update({
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
  
  ScheduleConfig.destroy({
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