'use strict';
const db = require("../models");
const { ROLE } = require('../util/constants');

// Operations using plain SQL (selects)
const findHousekeeper = async (req, res, next) => {
  const { filter, sort_by, state_address, availability } = req.body;

  let sql = `select account.user_id, person.first_name, person.last_name, person.bio, person.gender, person.image_url, person.cover_url
      , account_config.hour_rate_start, account_config.hour_rate_end, account_config.years_experience
    from account
    inner join person on person.pers_id = account.pers_id
    inner join user_role on user_role.user_id = account.user_id
    inner join account_config on account_config.user_id = user_role.user_id
    where user_role.role_id = :role_id`;
  // filters
  if (state_address) {
    sql += " and exists (select 1 from address where address.pers_id = person.pers_id and address.state = :state_address)";
  }
  if (filter) {
    sql += " and (person.first_name ilike :filter || '%' or person.last_name ilike :filter || '%')";
  }
  // sort
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      role_id: ROLE.HOUSEKEEPER,
      state_address: state_address,
      filter: filter
    }
  }).then(data => {
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