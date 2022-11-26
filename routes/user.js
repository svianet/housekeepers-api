'use strict';

const { Router } = require('express');
const userController = require('../controllers/user');

const api = Router();

// The main difference between PUT and PATCH in REST API is that PUT handles updates by replacing the entire entity, 
// while PATCH only updates the fields that you give it.
api.post('/', userController.addUser);
api.put('/:id', userController.addUser);
api.patch('/:id', userController.addUser);
api.delete('/', userController.addUser);

api.get('/', userController.getUsers);
api.get('/:id', function (req, res) {
  let { id } = req.params;
  res.send(`Person: ${id}`);
});

module.exports = api;