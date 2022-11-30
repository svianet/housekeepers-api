'use strict';

const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const api = Router();

api.post('/login', controller.login);
api.get('/logout', controller.logout);

module.exports = api;