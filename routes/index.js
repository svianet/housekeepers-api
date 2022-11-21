'use strict';
const router = require('express').Router();
const userRouter = require('./user');
const serviceRouter = require('./service');

// add here new routes if exists
router.use('/user', userRouter);
router.use('/service', serviceRouter);

module.exports = router;
