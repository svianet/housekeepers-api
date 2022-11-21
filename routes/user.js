'use strict';

const { Router } = require('express');
const userController = require('../controllers/user');

const api = Router();

api.get('/', userController.getUsers);

api.post('/', userController.addUser);

api.get('/:id', function (req, res) {
  let { id } = req.params;
  res.send(`Person: ${id}`);
});

module.exports = api;