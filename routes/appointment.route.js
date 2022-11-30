'use strict';
const { Router } = require('express');
const controller = require('../controllers/appointment.controller');
const api = Router();

api.post('/', controller.create);
api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES
api.post('/schedule', controller.create);
api.post('/approve', controller.create);
api.post('/reject', controller.create);
api.post('/view', controller.create);

module.exports = api;