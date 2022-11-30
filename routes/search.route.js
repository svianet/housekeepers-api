'use strict';
const { Router } = require('express');
const controller = require('../controllers/search.controller');
const api = Router();

// LOGIC BUSINESS ROUTES
api.post('/', controller.findHousekeeper);
api.post('/seeAvailability', controller.seeAvailability);
api.post('/inviteHousekeeper', controller.inviteHousekeeper);

module.exports = api;