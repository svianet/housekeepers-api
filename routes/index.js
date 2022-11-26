'use strict';
const router = require('express').Router();
const userRouter = require('./user');
const serviceRouter = require('./service');
const accountRouter = require('./account.route');
const personRouter = require('./person.route');

// add here new routes if exists
router.use('/user', userRouter);
router.use('/service', serviceRouter);
router.use('/account', accountRouter);
router.use('/person', personRouter);

module.exports = router;
