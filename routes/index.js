'use strict';
const router = require('express').Router();
const accountRouter = require('./account.route');
const accountConfigRouter = require('./account_config.route');
const roleRouter = require('./role.route');
const languageRouter = require('./language.route');
const serviceRouter = require('./service.route');
const personRouter = require('./person.route');
const addressRouter = require('./address.route');
const emailRouter = require('./email_address.route');
const phoneRouter = require('./phone.route');
const scheduleRouter = require('./schedule.route');
const scheduleDayRouter = require('./schedule_day.route');
const applicationRouter = require('./application.route');
const appointmentRouter = require('./appointment.route');
const serviceCompletionRouter = require('./service_completion.route');
const jobRouter = require('./job.route');
const searchRouter = require('./search.route');

// add here new routes if exists
router.use('/account', accountRouter);
router.use('/account/config', accountConfigRouter);
router.use('/role', roleRouter);
router.use('/language', languageRouter);
router.use('/service', serviceRouter);
router.use('/person', personRouter);
router.use('/address', addressRouter);
router.use('/email', emailRouter);
router.use('/phone', phoneRouter);
router.use('/schedule', scheduleRouter);
router.use('/schedule/config', scheduleDayRouter);
router.use('/application', applicationRouter);
router.use('/appointment', appointmentRouter);
router.use('/service_completion', serviceCompletionRouter);
router.use('/search', searchRouter);
router.use('/job', jobRouter);

module.exports = router;
