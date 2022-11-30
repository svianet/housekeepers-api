'use strict';
const { Router } = require('express');
const controller = require('../controllers/application.controller');
const api = Router();

api.post('/', controller.create);
api.get('/:job_id', controller.findAll);
api.get('/:job_id/:id', controller.findOne);
api.patch('/:job_id/:id', controller.update);
api.delete('/:job_id/:id', controller.remove);

// LOGIC BUSINESS ROUTES

module.exports = api;