'use strict';
const db = require("../models");
const Person = require("../models/person.model.js")(db.sequelize);
const PersonLanguage = require("../models/person_language.model")(db.sequelize);
const { tableName, schema } = Person.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = `SELECT * FROM ${schema}.${tableName}`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
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

// operations using the ORM (insert, update, delete, findByPk)
const findOne = async (req, res, next) => {
  const { id } = req.params;
  Person.findByPk(id)
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
  const { first_name, last_name, birthday, gender, bio, image_url, cover_url } = req.body;
  const t = await db.sequelize.transaction();
  try {
    // needs to save other person information
    const person = Person.build({ 
      first_name: first_name, 
      last_name: last_name, 
      birthday: birthday, 
      gender: gender, 
      bio: bio,
      image_url: image_url,
      cover_url: cover_url
    });
    await person.save({ transaction: t });

    res.status(200).json({ success: true, data: person });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  const { first_name, last_name, birthday, gender, bio, image_url, cover_url } = req.body;
  
  Person.update({
      first_name: first_name, 
      last_name: last_name, 
      birthday: birthday, 
      gender: gender, 
      bio: bio,
      image_url: image_url,
      cover_url: cover_url
    },
    {
      where: { pers_id: id }
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
  
  Person.destroy({
      where: { pers_id: id }
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

// business logic
const findPhones = async (req, res, next) => {
  const { pers_id } = req.params;
  let sql = `SELECT phone_id, phone_number, creation_date, pers_id, ddi
      FROM public.phone
      where pers_id = :pers_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      pers_id: pers_id
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

const findEmails = async (req, res, next) => {
  const { pers_id } = req.params;
  let sql = `SELECT email_id, email_address, pers_id FROM public.email_address
      where pers_id = :pers_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      pers_id: pers_id
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

const addLanguage = async (req, res, next) => {
  const { lang_id, pers_id } = req.body;
  const t = await db.sequelize.transaction();
  try {
    // needs to save other person information
    const person_language = PersonLanguage.build({ 
      lang_id: lang_id, 
      pers_id: pers_id
    });
    await person_language.save({ transaction: t });

    res.status(200).json({ success: true, data: person_language });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const findLanguages = async (req, res, next) => {
  const { pers_id } = req.params;
  let sql = `SELECT person_language.lang_id, language_name, language_code, pers_id
    FROM public.person_language
    inner join public.language on language.lang_id = person_language.lang_id
    where person_language.pers_id = :pers_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      pers_id: pers_id
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

const findAddresses = async (req, res, next) => {
  const { pers_id } = req.params;
  let sql = `SELECT adress_id, street_line1, street_line2, neighborhood, city, state, zipcode, pers_id 
    FROM address
    where pers_id = :pers_id`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT, 
    replacements: {
      pers_id: pers_id
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
  findAll, findOne, create, update, remove, findPhones, findEmails, findLanguages, findAddresses, addLanguage
};
