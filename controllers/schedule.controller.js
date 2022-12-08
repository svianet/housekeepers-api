'use strict';
const db = require("../models");
const Schedule = require("../models/schedule.model.js")(db.sequelize);
const { tableName, schema } = Schedule.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT schedule_id, user_id, schedule_name, creation_date FROM ${schema}.${tableName}`;
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
  Schedule.findByPk(id)
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
  const { user_id, schedule_name } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const schedule = Schedule.build({
      user_id: user_id,
      schedule_name: schedule_name,
      creation_date: new Date()
    });
    await schedule.save({ transaction: t });

    res.status(200).json({ success: true, data: schedule });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { schedule_name } = req.body;
  
  Schedule.update({
      schedule_name: schedule_name
    },
    {
      where: { schedule_id: id }
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
  
  Schedule.destroy({
      where: { schedule_id: id }
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

const findConfig = async (req, res, next) => {
  const { schedule_id } = req.params;
  let sql = `SELECT schedule_day_id, schedule_id, schedule_day, time_start, time_end
	    FROM public.schedule_day
      where schedule_id = :schedule_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      schedule_id: schedule_id
    }
  }).then(data => {
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

module.exports = {
  findAll, findOne, create, update, remove, findConfig
};