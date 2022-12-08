'use strict';
const db = require("../models");
const Job = require("../models/job.model.js")(db.sequelize);
const JobService = require("../models/job_service.model.js")(db.sequelize);
const { tableName, schema } = Job.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT job_id, job_type, start_date, frequency, days, zipcode, bedrooms, bathrooms, have_pets, sq_footage, provide_supplies, provide_equipment, hour_rate_start, hour_rate_end, end_date, user_id, job_description, job_status FROM ${schema}.${tableName}`;
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
  Job.findByPk(id)
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
  const { job_type, start_date, frequency, days, zipcode, bedrooms, bathrooms, have_pets, sq_footage, provide_supplies, provide_equipment, hour_rate_start, hour_rate_end, end_date, user_id, job_description, job_status } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const job = Job.build({
        job_type: job_type,
        start_date: start_date,
        frequency: frequency,
        days: days,
        zipcode: zipcode,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        have_pets: have_pets,
        sq_footage: sq_footage,
        provide_supplies: provide_supplies,
        provide_equipment: provide_equipment,
        hour_rate_start: hour_rate_start,
        hour_rate_end: hour_rate_end,
        end_date: end_date,
        user_id: user_id,
        job_description: job_description,
        job_status: job_status
    });
    await job.save({ transaction: t });

    res.status(200).json({ success: true, data: job });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { job_type, start_date, frequency, days, zipcode, bedrooms, bathrooms, have_pets, sq_footage, provide_supplies, provide_equipment, hour_rate_start, hour_rate_end, end_date, user_id, job_description, job_status } = req.body;
  
  Job.update({
      job_type: job_type,
      start_date: start_date,
      frequency: frequency,
      days: days,
      zipcode: zipcode,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      have_pets: have_pets,
      sq_footage: sq_footage,
      provide_supplies: provide_supplies,
      provide_equipment: provide_equipment,
      hour_rate_start: hour_rate_start,
      hour_rate_end: hour_rate_end,
      end_date: end_date,
      user_id: user_id,
      job_description: job_description,
      job_status: job_status
    },
    {
      where: { job_id: id }
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
  
  Job.destroy({
      where: { job_id: id }
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

const findServices = async (req, res, next) => {
  const { job_id } = req.params;
  let sql = `SELECT service.service_id, service.service_name 
      FROM public.job_service
      inner join service on service.service_id = job_service.service_id
      where job_id = :job_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      job_id: job_id
    }
  })
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

const addService = async (req, res, next) => {
  const { job_id } = req.params;
  const { service_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const job_service = JobService.build({ 
      job_id: job_id, 
      service_id: service_id
    });
    await job_service.save({ transaction: t });

    res.status(200).json({ success: true, data: job_service });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const removeService = async (req, res, next) => {
  const { job_id } = req.params;
  const { service_id } = req.body;
  
  JobService.destroy({
      where: { job_id: job_id, service_id: service_id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot delete record with id=${job_id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
};

// O - Opened, C - Cancelled, E - Expired, A - Accepted, D - Done
// @todo each function must be a defined status and your rules
const updateStatus = async (req, res, next) => {
  const { job_id } = req.params;
  const { job_status } = req.body;
  // it needs to validate status
  
  Job.update({
      job_status: job_status
    },
    {
      where: { job_id: job_id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot update the record with id=${job_id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  findAll, findOne, create, update, remove, addService, removeService, findServices, updateStatus
};