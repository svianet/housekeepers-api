'use strict';

const { Router } = require('express');
const serviceController = require('../controllers/service');

const api = Router();

api.get('/', serviceController.getServices);

api.get('/:id', function (req, res) {
  let { id } = req.params;
  res.send(`Service: ${id}`);
});

module.exports = api;
