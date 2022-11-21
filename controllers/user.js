'use strict';
const Model = require('../models/model');
const User = require('../models/User');

const userModel = new Model('public.account');

const getUsers = async (req, res, next) => {
  try {
    const data = await userModel.select('user_id, email');
    res.status(200).json({ success: true, data: data.rows });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  const { user_id, email } = req.body;
  try {
    const user = new User({ user_id, email });
    const result = await user.createUser();
    res.send(user);
  } catch (error) {
    // console.log(error)
    const errorToThrow = new Error();
    switch (error?.code) {
      case '23505':
        errorToThrow.message = 'User already exists';
        errorToThrow.statusCode = 403;
        break;
      default:
        errorToThrow.statusCode = 500;
    }
    //pass error to next()
    next(errorToThrow);
  }
};
module.exports = {
  getUsers, addUser
};
