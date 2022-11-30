'use strict';
const { Router } = require('express');
const controller = require('../controllers/service_completion.controller');
const api = Router();

api.post('/', controller.create);
//api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES
api.post('/complete', controller.create);
api.post('/validateExecution', controller.create);
api.post('/survey', controller.create);

module.exports = api;