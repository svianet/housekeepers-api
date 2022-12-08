'use strict';
const { Router } = require('express');
const controller = require('../controllers/account_config.controller');
const api = Router();

api.post('/', controller.create);
api.get('/:user_id', controller.findOne);
api.patch('/:user_id', controller.update);
api.delete('/:user_id', controller.remove);

// LOGIC BUSINESS ROUTES
api.get('/service/:user_id', controller.findServices);
api.post('/service/:user_id', controller.addService);
api.delete('/service/:user_id', controller.removeService);
api.get('/schedule/:user_id', controller.findSchedules);

module.exports = api;