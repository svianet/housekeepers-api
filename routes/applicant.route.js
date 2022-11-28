'use strict';
const { Router } = require('express');
const controller = require('../controllers/applicant.controller');
const api = Router();

api.post('/', controller.create);
api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES

module.exports = api;