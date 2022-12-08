'use strict';
const db = require("../models");
const AccountConfig = require("../models/account_config.model.js")(db.sequelize);
const AccountService = require("../models/account_service.model")(db.sequelize);

// operations using the ORM (insert, update, delete, findByPk)
const findOne = async (req, res, next) => {
  const { user_id } = req.params;
  AccountConfig.findOne({ where: { user_id: user_id }})
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(400).send({ success: false, message: `Cannot find record with user_id=${user_id}.` });
      }
    })
    .catch(err => {
      next(err)
    });
};

const create = async (req, res, next) => {
  const { user_id, hour_rate_start, hour_rate_end, years_experience } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const account_config = AccountConfig.build({
      user_id: user_id,
      hour_rate_start: hour_rate_start,
      hour_rate_end: hour_rate_end,
      years_experience: years_experience
    });
    await account_config.save({ transaction: t });

    res.status(200).json({ success: true, data: account_config });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { user_id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { hour_rate_start, hour_rate_end, years_experience } = req.body;
  
  AccountConfig.update({
      user_id: user_id,
      hour_rate_start: hour_rate_start,
      hour_rate_end: hour_rate_end,
      years_experience: years_experience
    },
    {
      where: { user_id: user_id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot update the record with user_id=${user_id}.` });
      }
    })
    .catch(err => {
      next(err);
    });
}

const remove = async (req, res, next) => {
  const { user_id } = req.params;
  
  AccountConfig.destroy({
      where: { user_id: user_id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: `Cannot delete record with user_id=${user_id}.` });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const findServices = async (req, res, next) => {
  const { user_id } = req.params;
  let sql = `SELECT service.service_id, service.service_name 
      FROM public.account_service
      inner join service on service.service_id = account_service.service_id
      where user_id = :user_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      user_id: user_id
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
  const { user_id } = req.params;
  const { service_id } = req.body;
  console.log(user_id, service_id);
  const t = await db.sequelize.transaction();
  try {
    const account_service = AccountService.build({ 
      user_id: user_id, 
      service_id: service_id
    });
    await account_service.save({ transaction: t });

    res.status(200).json({ success: true, data: account_service });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const removeService = async (req, res, next) => {
  const { user_id } = req.params;
  const { service_id } = req.body;
  
  AccountService.destroy({
      where: { user_id: user_id, service_id: service_id }
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

const findSchedules = async (req, res, next) => {
  const { user_id } = req.params;
  let sql = `SELECT schedule_id, user_id, creation_date, schedule_name
	    FROM public.schedule
      where user_id = :user_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      user_id: user_id
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

module.exports = {
  findOne, create, update, remove, findServices, addService, removeService, findSchedules
};