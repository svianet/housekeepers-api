'use strict';
const db = require("../models");
const { ROLE } = require('../util/constants');

// Operations using plain SQL (selects)
const findHousekeeper = async (req, res, next) => {
  let sql = `select account.user_id, person.first_name, person.last_name, person.bio, person.gender
      , account_config.hour_rate_start, account_config.hour_rate_end, account_config.years_experience
    from account
    inner join person on person.pers_id = account.pers_id
    inner join user_role on user_role.user_id = account.user_id
    inner join account_config on account_config.user_id = user_role.user_id
    where user_role.role_id = ${ROLE.HOUSEKEEPER}`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: 'Cannot find housekeepers.' });
      }
    })
    .catch(err => {
      next(err)
    });
};

const seeAvailability = async (req, res, next) => {
  let sql = `SELECT * FROM account`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: 'Cannot find housekeepers.' });
      }
    })
    .catch(err => {
      next(err)
    });
};

const inviteHousekeeper = async (req, res, next) => {
  let sql = `SELECT * FROM account`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: 'Cannot find housekeepers.' });
      }
    })
    .catch(err => {
      next(err)
    });
};

module.exports = {
  findHousekeeper, seeAvailability, inviteHousekeeper
};