'use strict';
const db = require("../models");
const Application = require("../models/application.model.js")(db.sequelize);
const { APPLICATION } = require('../util/constants');
const { tableName, schema } = Application.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  const { job_id } = req.params;
  let sql = `SELECT application_id, user_id, job_id, application_status, application_date
      FROM public.application
      where job_id = :job_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      job_id: job_id
    }
  }).then(data => {
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
  const { id, job_id } = req.params;
  let sql = `SELECT application_id, user_id, job_id, application_status, application_date
      FROM public.application
      where job_id = :job_id
      and application_id = :application_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      application_id: id, 
      job_id: job_id      
    }
  }).then(data => {
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
  const { user_id, job_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const application = Application.build({
      user_id: user_id, 
      job_id: job_id, 
      application_status: APPLICATION.STATUS.REQUESTED,
      application_date: new Date()
    });
    await application.save({ transaction: t });

    res.status(200).json({ success: true, data: application });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id, job_id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { application_status } = req.body;
  
  Application.update({
      application_status: application_status
    },
    {
      where: { application_id: id, job_id: job_id }
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
  const { id, job_id } = req.params;
  
  Application.destroy({
      where: { application_id: id, job_id: job_id }
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