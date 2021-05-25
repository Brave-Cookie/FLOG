const router = require('express').Router();
const controller = require('./conf_log.controller');

// http://localhost:3000/api/auth/register
router.get('/log/fetch/:meeting_id', controller.logFetch);
router.get('/log/fetch/:meeting_id/:feeling', controller.logFilter);
module.exports = router;
