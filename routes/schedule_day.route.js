'use strict';
const { Router } = require('express');
const controller = require('../controllers/schedule_day.controller');
const api = Router();

api.post('/', controller.create);
// api.get('/', controller.findAll);
api.get('/:schedule_id/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES

module.exports = api;