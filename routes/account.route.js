'use strict';

const { Router } = require('express');
const controller = require('../controllers/account.controller');

const api = Router();

// DEFAULT routes (CRUD)
// The main difference between PUT and PATCH in REST API is that PUT handles updates by replacing the entire entity, 
// while PATCH only updates the fields that you give it. We won't implement PUT method
api.post('/', controller.create);
api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES
api.post('/approve', controller.approve);
api.post('/reject', controller.reject);

module.exports = api;