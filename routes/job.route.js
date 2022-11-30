'use strict';
const { Router } = require('express');
const controller = require('../controllers/job.controller');
const api = Router();

api.post('/', controller.create);
api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES
api.get('/service/:job_id', controller.findServices);
api.post('/service/:job_id', controller.addService);
api.delete('/service/:job_id', controller.removeService);
api.post('/status/:job_id', controller.updateStatus);

module.exports = api;